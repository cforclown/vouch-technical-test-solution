import { Document, Types } from 'mongoose';
import { IUser } from '../users';
import { IMessage } from '../messages';

export enum EChannelRoles {
  OWNER='owner',
  ADMIN='admin',
  MEMBER='member'
}

export interface IChannelUserRole {
  user: Types.ObjectId;
  role: EChannelRoles;
}

export const channelTypes = ['dm', 'group'] as const;
export type ChannelsTypes = typeof channelTypes[number];
export const isValidChannelType = (channelType: string): channelType is ChannelsTypes => channelTypes.includes(channelType as ChannelsTypes);

export interface IChannelRaw extends Document {
  _id: Types.ObjectId;
  id: string;
  name?: string; // only when type==='group'
  type: ChannelsTypes;
  desc?: string;
  users: Types.ObjectId[];
  roles?: IChannelUserRole[]; //  undefined if type==='dm'
  messages: IMessage[];
  createdAt?: Date;
  updatedAt?: Date;
  archived?: boolean;
}

export interface IChannelRes extends Omit<IChannelRaw, 'users' | 'messages'> {
  users: IUser[];
  unreadMessages?: number;
  lastMessage?: string;
}

export type ICreateDmChannel = {
  type: 'dm',
  users: [Types.ObjectId, Types.ObjectId];
};

export type ICreateGroupChannel = {
  type: 'group',
  users: Types.ObjectId[];
  roles: IChannelUserRole;
};

export type IUpdateChannel = {
  id: string;
  name?: string;
  desc?: string;
  users?: string[];
  roles?: {
    user: string;
    role: EChannelRoles;
  }[]
};
