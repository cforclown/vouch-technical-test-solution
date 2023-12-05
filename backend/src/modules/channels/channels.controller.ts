import { Request } from 'express';
import { IChannel } from './channels.types';
import { BaseController } from '../../utils/base/base-controller';
import { ChannelsService } from './channels.service';
import { IExplorationRes, RestApiException } from '../../utils';
import { IUser } from '../users';

export class ChannelsController extends BaseController<IChannel> {
  public static readonly INSTANCE_NAME = 'channelsController';

  private readonly channelsService: ChannelsService;

  constructor (channelsService: ChannelsService) {
    super(channelsService);
    this.channelsService = channelsService;

    this.getUserChannels = this.getUserChannels.bind(this);
    this.explore = this.explore.bind(this);
    this.createGroup = this.createGroup.bind(this);
    this.updateGroup = this.updateGroup.bind(this);
  }

  async getUserChannels ({ user }: Request): Promise<IChannel[]> {
    return this.channelsService.getUserChannels((user as IUser).id);
  }

  async explore ({ body }: Request): Promise<IExplorationRes<IChannel>> {
    return this.channelsService.explore(body);
  }

  async createGroup ({ user, body }: Request): Promise<IChannel> {
    return this.channelsService.createGroup((user as IUser).id, body);
  }

  async updateGroup ({ params, body }: Request): Promise<IChannel> {
    const channel = await this.channelsService.updateGroup(params.id, body);
    if (!channel) {
      throw new RestApiException('Failed to update channel');
    }

    return channel;
  }
}
