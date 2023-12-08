import { IChannelRaw, IChannelRes } from './channels.types';
import { BaseDataAccessObject } from '../../utils/base/base-dao-mongo';
import { model, Types } from 'mongoose';
import { IExplorationPayload, IExplorationRes } from '../../utils';
import { IMessage } from '../messages';

export class ChannelsDao extends BaseDataAccessObject<IChannelRaw> {
  public static readonly INSTANCE_NAME = 'channelsDao';
  public static readonly MODEL_NAME = 'channels';

  constructor () {
    super(model<IChannelRaw>(ChannelsDao.MODEL_NAME));
  }

  async getChannel (id: string): Promise<Omit<IChannelRaw, 'messages'> | null> {
    return this.model.findOne({ _id: id, archived: false }).select('-messages').exec();
  }

  async createChannel(payload: Record<string, any>): Promise<IChannelRaw>;
  async createChannel(payload: Record<string, any>, populateUsers: true): Promise<IChannelRes>;
  async createChannel (payload: Record<string, any>, populateUsers?: boolean): Promise<IChannelRaw | IChannelRes> {
    const createdChannel = await this.create(payload);
    if (!populateUsers) {
      return createdChannel;
    }

    const channel = await this.model.findById<IChannelRes>(createdChannel).populate('users').exec();
    if (!channel) {
      throw new Error('Unexpected error occured when creating channel');
    }

    return channel;
  }

  async getUserChannels (user: string): Promise<Omit<IChannelRes, 'messages'>[]> {
    return this.model
      .aggregate([
        {
          $match: {
            users: new Types.ObjectId(user),
            archived: false
          }
        },
        {
          $lookup: {
            from: 'users',
            localField: 'users',
            foreignField: '_id',
            as: 'users',
            pipeline: [{
              $project: {
                password: 0
              }
            }]
          }
        },
        {
          $addFields: {
            id: '$_id',
            users: {
              $map: {
                input: '$users',
                as: 'user',
                in: {
                  $mergeObjects: [
                    '$$user',
                    {
                      id: '$$user._id'
                    }
                  ]
                }
              }
            },
            unreadMessages: {
              $size: {
                $filter: {
                  input: { $ifNull: ['$messages', []] }, // default empty array if array is does not exist
                  cond: {
                    $and: [
                      { $ne: ['$$this.read', true] },
                      { $ne: ['$$this.sender', new Types.ObjectId(user)] }
                    ]
                  }
                }
              }
            },
            lastMessage: {
              $last: '$messages.text'
            }
          }
        },
        {
          $project: {
            messages: 0
          }
        }
      ])
      .exec();
  }

  async explore ({ query, pagination }: IExplorationPayload): Promise<IExplorationRes<IChannelRaw>> {
    const result = await this.model
      .aggregate([
        {
          $match: {
            $or: [
              { name: { $regex: query ?? '', $options: 'i' } },
              { desc: { $regex: query ?? '', $options: 'i' } }
            ]
          }
        },
        {
          $sort: {
            [pagination.sort.by]: pagination.sort.order
          }
        },
        {
          $addFields: {
            id: '$_id'
          }
        },
        {
          $facet: {
            metadata: [
              { $count: 'total' },
              { $addFields: { page: pagination.page } }
            ],
            data: [
              { $skip: (pagination.page - 1) * pagination.limit },
              { $limit: pagination.limit }
            ]
          }
        }
      ])
      .exec();

    const response = {
      data: [],
      exploration: {
        query,
        pagination: {
          ...pagination,
          pageCount: 0
        }
      }
    };

    if (result[0].metadata.length && result[0].data.length) {
      response.data = result[0].data;
      response.exploration.pagination.pageCount = Math.ceil(result[0].metadata[0].total / pagination.limit);
    }

    return response;
  }

  async pushMsg (channel: string, msg: IMessage): Promise<[IChannelRaw, IMessage] | null>;
  async pushMsg (channel: string, msg: IMessage, populateUsers: true): Promise<[IChannelRes, IMessage] | null>;
  async pushMsg (channel: string, msg: IMessage, populateUsers?: boolean): Promise<[IChannelRaw | IChannelRes, IMessage] | null> {
    const pipeline = this.model.findOneAndUpdate({ _id: channel }, {
      $push: { messages: msg }
    }, { new: true });
    if (populateUsers) {
      pipeline.populate('users');
    }
    const channelDoc = await pipeline.exec();
    if (!channelDoc) {
      return null;
    }

    return [channelDoc, msg];
  }

  async editMsg (channel: string, msgId: string, text: string): Promise<IMessage | null> {
    const channelDoc = await this.get(channel);
    if (!channelDoc) {
      return null;
    }
    const msgDoc: IMessage | undefined = channelDoc.messages.find(m => m.id === msgId);
    if (!msgDoc) {
      return null;
    }

    msgDoc.text = text;
    await channelDoc.save();

    return msgDoc;
  }

  async readMsgs (channel: string, user: string): Promise<void> {
    await this.model.updateOne({ _id: channel }, [{
      $set: {
        messages: {
          $map: {
            input: '$messages',
            as: 'message',
            in: {
              $cond: [
                {
                  $and: [
                    { $ne: ['$$message.read', true] },
                    { $ne: ['$$message.sender', new Types.ObjectId(user)] }
                  ]
                },
                {
                  $mergeObjects: ['$$message', { read: true }]
                },
                '$$message'
              ]
            }
          }
        }
      }
    }]);
  }

  async getMsgs (channel: string): Promise<IMessage[] | null> {
    const channelDoc = await this.model
      .findOne({ _id: channel, archived: false })
      .sort({ createdAt: 'descending' })
      .exec();
    if (!channelDoc) {
      return null;
    }

    return channelDoc.messages;
  }
}
