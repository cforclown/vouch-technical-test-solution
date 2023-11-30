import { ChannelsDao, IChannel } from '.';
import { IExplorationPayload, IExplorationResponse } from '../../utils';
import { BaseService } from '../../utils/base/base-service';

export class ChannelsService extends BaseService<IChannel> {
  public static readonly INSTANCE_NAME = 'channelsService';

  private readonly channelsDao: ChannelsDao;

  constructor (channelsDao: ChannelsDao) {
    super(channelsDao);

    this.channelsDao = channelsDao;
  }

  async explore (payload: IExplorationPayload): Promise<IExplorationResponse<IChannel>> {
    return this.channelsDao.explore(payload);
  }
}
