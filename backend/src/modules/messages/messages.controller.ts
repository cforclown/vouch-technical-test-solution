import { Request } from 'express';
import { IMessage } from './messages.types';
import { MessagesService } from './messages.service';
import { RestApiException } from '../../utils';
import { IUser } from '../users';
import { IChannel } from '../channels';

export class MessagesController {
  public static readonly INSTANCE_NAME = 'messagesController';

  private readonly messagesService: MessagesService;

  constructor (messagesService: MessagesService) {
    this.messagesService = messagesService;

    this.getMsgs = this.getMsgs.bind(this);
    this.startConversation = this.startConversation.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
  }

  async getMsgs ({ params }: Request): Promise<IMessage[]> {
    const msgs = await this.messagesService.getMsgs(params.id);
    if (!msgs) {
      throw new RestApiException('Invalid channel id');
    }

    return msgs;
  }

  async startConversation ({ user, body }: Request): Promise<IChannel> {
    return this.messagesService.startConversation((user as IUser).id, body);
  }

  async sendMsg ({ user, params, body }: Request): Promise<IMessage | null> {
    const msg = await this.messagesService.sendMsg(params.id, (user as IUser).id, body);
    if (!msg) {
      throw new RestApiException('Failed to send message');
    }

    return msg;
  }
}
