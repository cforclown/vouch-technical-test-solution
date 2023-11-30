import { IMessage } from '.';
import { IExplorationPayload, IExplorationResponse } from '../../utils';
import { ChannelsService } from '../channels';

export class MessagesService {
  public static readonly INSTANCE_NAME = 'messagesService';

  private readonly channelsService: ChannelsService;

  constructor (channelsService: ChannelsService) {
    this.channelsService = channelsService;
  }

  async explore (channelId: string, payload: IExplorationPayload): Promise<IExplorationResponse<IMessage>> {
    return this.channelsService.exploreMsgs(channelId, payload);
  }
}
