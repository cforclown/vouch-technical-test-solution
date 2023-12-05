import { IChannel } from './channels.types';
import { BaseDataAccessObject } from '../../utils/base/base-dao-mongo';
import { model, Types } from 'mongoose';
import { IExplorationPayload, IExplorationRes } from '../../utils';
import { IMessage } from '../messages';

export class ChannelsDao extends BaseDataAccessObject<IChannel> {
  public static readonly INSTANCE_NAME = 'channelsDao';
  public static readonly MODEL_NAME = 'channels';

  constructor () {
    super(model<IChannel>(ChannelsDao.MODEL_NAME));
  }

  async createChannel (payload: Record<string, any> & { id?: string | undefined; }, populateUsers?: boolean): Promise<IChannel> {
    const createdChannel = await this.create(payload);
    if (!populateUsers) {
      return createdChannel;
    }

    const channel = await this.model.findById(createdChannel).populate('users').exec();
    if (!channel) {
      throw new Error('Unexpected error occured when creating channel');
    }

    return channel;
  }

  async getUserChannels (user: string): Promise<IChannel[]> {
    return this.model
      .find({
        users: new Types.ObjectId(user),
        archived: false
      })
      .populate('users')
      .select('-messages')
      .sort({ updatedAt: 'descending' })
      .exec();
  }

  async explore ({ query, pagination }: IExplorationPayload): Promise<IExplorationRes<IChannel>> {
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

  async pushMsg (channel: string, msg: IMessage): Promise<IMessage | null> {
    const channelDoc = await this.model.findOneAndUpdate({ _id: channel }, {
      $push: { messages: msg }
    }, { new: true });
    if (!channelDoc) {
      return null;
    }

    return msg;
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
