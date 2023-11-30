import { Request } from 'express';
import { IMessage } from './messages.types';
import { MessagesService } from './messages.service';
import { IExplorationResponse } from '../../utils';

export class MessagesController {
  public static readonly INSTANCE_NAME = 'messagesController';

  private readonly messagesService: MessagesService;

  constructor (messagesService: MessagesService) {
    this.messagesService = messagesService;
    this.explore = this.explore.bind(this);
  }

  async explore ({ params, body }: Request): Promise<IExplorationResponse<IMessage>> {
    return this.messagesService.explore(params.id, body);
  }
}
