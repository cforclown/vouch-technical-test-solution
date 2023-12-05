import { Types } from 'mongoose';
import { IEditMsgPayload, IMessage, ISendMsgPayload, IStartConversationPayload } from '.';
import { ChannelsService, IChannel } from '../channels';

export class MessagesService {
  public static readonly INSTANCE_NAME = 'messagesService';

  private readonly channelsService: ChannelsService;

  constructor (channelsService: ChannelsService) {
    this.channelsService = channelsService;
  }

  async getMsgs (channel: string): Promise<IMessage[] | null> {
    return this.channelsService.getMsgs(channel);
  }

  // user send message to another for the first time (no channel yet)
  async startConversation (sender: string, payload: IStartConversationPayload): Promise<IChannel> {
    let channel: IChannel | null = await this.channelsService.createDm([sender, payload.receiver]);
    await this.channelsService.pushMsg(channel.id, this.createMsgObj(channel.id, sender, payload.text));
    channel = await this.channelsService.get(channel.id);

    return channel as IChannel;
  }

  async sendMsg (channel: string, sender: string, payload: ISendMsgPayload): Promise<IMessage | null> {
    return this.channelsService.pushMsg(channel, this.createMsgObj(channel, sender, payload.text));
  }

  async editMsg (channel: string, msgId: string, payload: IEditMsgPayload): Promise<IMessage | null> {
    return this.channelsService.editMsg(channel, msgId, payload.text);
  }

  createMsgObj (channel: string, sender: string, text: string): IMessage {
    const id = new Types.ObjectId();
    const createdAt = new Date();
    return {
      _id: id,
      id: id.toString(),
      channel: new Types.ObjectId(channel),
      sender: new Types.ObjectId(sender),
      text,
      createdAt,
      updatedAt: createdAt
    };
  }
}
