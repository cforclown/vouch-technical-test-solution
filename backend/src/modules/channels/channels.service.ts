import { Types } from 'mongoose';
import { some } from 'lodash';
import { ChannelsDao, IChannelRaw, IChannelRes, ICreateDmChannel, ICreateGroupDto, IUpdateChannel, IUpdateGroupDto } from '.';
import { BaseService, IExplorationPayload, IExplorationRes, RestApiException } from '../../utils';
import { IUser, UsersService } from '../users';
import { IMessage } from '../messages';

export class ChannelsService extends BaseService<IChannelRaw> {
  public static readonly INSTANCE_NAME = 'channelsService';

  constructor (private readonly channelsDao: ChannelsDao, private readonly usersService: UsersService) {
    super(channelsDao);

    this.channelsDao = channelsDao;
    this.usersService = usersService;
  }

  async getUserChannels (user: string): Promise<Omit<IChannelRes, 'messages'>[]> {
    return this.channelsDao.getUserChannels(user);
  }

  async explore (payload: IExplorationPayload): Promise<IExplorationRes<IChannelRaw>> {
    return this.channelsDao.explore(payload);
  }

  async createDm (users: [string, string]): Promise<IChannelRes> {
    const usersDocs = await Promise.all(users.map(user => this.usersService.get(user)));
    if (some(usersDocs, user => !user)) {
      throw new RestApiException('Some user id is invalid');
    }

    const dmChannel: ICreateDmChannel = {
      type: 'dm',
      users: usersDocs.map(user => new Types.ObjectId((user as IUser).id)) as [Types.ObjectId, Types.ObjectId]
    };

    return this.channelsDao.createChannel(dmChannel, true);
  }

  async createGroup (user: string, payload: ICreateGroupDto): Promise<IChannelRes> {
    const usersDocs = await Promise.all(payload.users.map(user => this.usersService.get(user)));
    if (some(usersDocs, user => !user)) {
      throw new RestApiException('Some user id is invalid');
    }

    const users = [user, ...payload.users.filter(u => u !== user)];
    const groupChannel: ICreateGroupDto & { type: 'group' } = {
      ...payload,
      type: 'group',
      users
    };

    return this.channelsDao.createChannel(groupChannel, true);
  }

  async updateGroup (channel: string, payload: IUpdateGroupDto): Promise<IChannelRaw | null> {
    if (payload.roles) {
      const [channelDoc, ...usersDocs] = await Promise.all([
        this.channelsDao.getChannel(channel),
        ...payload.roles.map(role => this.usersService.get(role.user))
      ]);
      if (!channelDoc) {
        throw new RestApiException('Channel not found');
      }
      if (some(usersDocs, user => !user) || some(payload.roles, role => !usersDocs.find(u => u?.id === role.user))) {
        throw new RestApiException('Some roles assign to invalid user id');
      }
    }

    const groupChannel: IUpdateChannel = {
      id: channel,
      ...payload
    };

    return this.update(groupChannel);
  }

  async pushMsg (channel: string, msg: IMessage): Promise<[IChannelRaw, IMessage] | null>
  async pushMsg (channel: string, msg: IMessage, populateUsers: true): Promise<[IChannelRes, IMessage] | null>
  async pushMsg (channel: string, msg: IMessage, populateUsers?: boolean): Promise<[IChannelRaw | IChannelRes, IMessage] | null> {
    return this.channelsDao.pushMsg(channel, msg, populateUsers as any);
  }

  async editMsg (channel: string, msgId: string, text: string): Promise<IMessage | null> {
    return this.channelsDao.editMsg(channel, msgId, text);
  }

  async readMsgs (channel: string, user: string): Promise<void> {
    return this.channelsDao.readMsgs(channel, user);
  }

  async getMsgs (channel: string): Promise<IMessage[] | null> {
    return this.channelsDao.getMsgs(channel);
  }
}
