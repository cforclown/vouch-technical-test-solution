import { Request } from 'express';
import { Server } from 'socket.io';
import { IMessage } from './messages.schema';
import { MessagesService } from './messages.service';
import { dro, Logger, RestApiException } from '../../utils';
import { IUser } from '../users';
import { IChannelRes } from '../channels';
import { IO_INSTANCE_NAME } from '../../socketio';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';
import SIOController from '../../socketio/sio.controller';
import { ISendMsgPayload, IStartConversationPayload } from './messages.dto';

export class MessagesController {
  public static readonly INSTANCE_NAME = 'messagesController';

  constructor (
    private readonly messagesService: MessagesService,
    private readonly sioController: SIOController
  ) {
    this.getMsgs = this.getMsgs.bind(this);
    this.startConversation = this.startConversation.bind(this);
    this.sendMsg = this.sendMsg.bind(this);
    this.readMsgs = this.readMsgs.bind(this);
  }

  async getMsgs ({ params }: Request): Promise<IMessage[]> {
    const msgs = await this.messagesService.getMsgs(params.id);
    if (!msgs) {
      throw new RestApiException('Invalid channel id');
    }

    return msgs;
  }

  async startConversation ({ app, user: u, body }: Request): Promise<IChannelRes | null> {
    const user = u as IUser;
    const payload: IStartConversationPayload = body;

    const result = await this.messagesService.startConversation(user.id, payload);
    if (!result) {
      throw new RestApiException('Invalid channel id');
    }

    const [channel, msg] = result;

    const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined | null = app.get(IO_INSTANCE_NAME);
    io?.to(payload.receiver).emit('on-message', dro.response(msg));

    return channel;
  }

  async sendMsg ({ app, user: u, params, body }: Request): Promise<IMessage | null> {
    const user = u as IUser;
    const payload: ISendMsgPayload = body;

    const result = await this.messagesService.sendMsg(params.id, user.id, payload);
    if (!result) {
      throw new RestApiException('Failed to send message');
    }

    const [channel, msg] = result;
    const receiver = channel.users.find(u => u.toString() !== user.id);
    if (!receiver) {
      Logger.warn('Unexpected error occured. Send message receiver not found');
    } else {
      const io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | undefined | null = app.get(IO_INSTANCE_NAME);
      io?.to(receiver.toString()).emit('on-message', dro.response(msg));
    }

    return msg;
  }

  async readMsgs ({ user: u, params }: Request): Promise<boolean> {
    const user = u as IUser;
    await this.messagesService.readMsgs(params.id, user.id);

    return true;
  }
}
