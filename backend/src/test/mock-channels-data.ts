import { Types } from 'mongoose';
import { EChannelRoles, ICreateChannelPayload, ICreateGroupChannelPayload, IUpdateChannelPayload } from '../modules';
import { IExplorationPayload } from '../utils/exploration/exploration';
import { mockUser } from './mock-users-data';

const mockObjectId = new Types.ObjectId();

export const mockChannel = {
  _id: mockObjectId,
  id: mockObjectId.toString(),
  name: 'channel name',
  type: 'dm',
  desc: 'mock channel desc',
  users: [mockUser]
};

export const mockChannelApiRes = {
  ...mockChannel,
  _id: mockChannel.id,
  users: [{
    ...mockUser,
    _id: mockUser.id
  }]
};

export const mockCreateChannelPayload: ICreateChannelPayload = {
  name: 'channel name',
  type: 'dm',
  desc: 'mock channel desc',
  users: [mockUser.id],
  roles: [{
    user: mockUser.id,
    role: EChannelRoles.OWNER
  }]
};

export const mockCreateGroupPayload: ICreateGroupChannelPayload = {
  name: 'channel name',
  desc: 'mock channel desc',
  users: [mockUser.id],
  roles: [{
    user: mockUser.id,
    role: EChannelRoles.OWNER
  }]
};

export const mockUpdateChannelPayload: IUpdateChannelPayload = {
  name: 'channel name',
  desc: 'mock channel desc'
};

export const mockUpdateGroupPayload: IUpdateChannelPayload = {
  name: 'channel name',
  desc: 'mock channel desc'
};

export const mockExplorationPayload: IExplorationPayload = {
  query: 'query',
  pagination: {
    page: 1,
    limit: 10,
    sort: {
      by: 'name',
      order: 1
    }
  }
};
