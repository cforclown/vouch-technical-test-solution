import { Request } from 'express';
import { IChannel } from './channels.types';
import { BaseController } from '../../utils/base/base-controller';
import { ChannelsService } from './channels.service';
import { IExplorationResponse } from '../../utils';

export class ChannelsController extends BaseController<IChannel> {
  public static readonly INSTANCE_NAME = 'channelsController';

  private readonly channelsService: ChannelsService;

  constructor (channelsService: ChannelsService) {
    super(channelsService);
    this.channelsService = channelsService;
    this.explore = this.explore.bind(this);
  }

  async explore ({ body }: Request): Promise<IExplorationResponse<IChannel>> {
    return this.channelsService.explore(body);
  }
}
