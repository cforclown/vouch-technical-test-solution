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

export interface IChannel extends Document {
  _id: Types.ObjectId;
  id: string;
  name: string;
  type: ChannelsTypes;
  desc?: string;
  users: IUser[] | Types.ObjectId;
  roles?: IChannelUserRole[]; //  undefined if type==='dm'
  messages: IMessage[];
  createdAt?: Date;
  updatedAt?: Date;
  archived?: boolean;
}

export type ICreateChannelPayload = {
  name: string;
  type: ChannelsTypes;
  desc?: string;
  users: IUser[] | Types.ObjectId;
  roles?: IChannelUserRole[]; //  undefined if type==='dm'
};

export type ICreateGroupChannelPayload = Omit<ICreateChannelPayload, 'type'>

export interface IUpdateChannelPayload {
  name?: string;
  desc?: string;
  users?: string[]; // only allowed to update users (add/remove) if type is 'group'
  roles?: IChannelUserRole[]; // only allowed to update roles (add/remove) if type is 'group'
}
