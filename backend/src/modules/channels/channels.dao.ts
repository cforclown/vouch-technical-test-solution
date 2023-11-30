import { IChannel } from './channels.types';
import { BaseDataAccessObject } from '../../utils/base/base-dao-mongo';
import { model } from 'mongoose';
import { IExplorationPayload, IExplorationResponse } from '../../utils';

export class ChannelsDao extends BaseDataAccessObject<IChannel> {
  public static readonly INSTANCE_NAME = 'channelsDao';
  public static readonly MODEL_NAME = 'channels';

  constructor () {
    super(model<IChannel>(ChannelsDao.MODEL_NAME));
  }

  async explore ({ query, pagination }: IExplorationPayload): Promise<IExplorationResponse<IChannel>> {
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
}
