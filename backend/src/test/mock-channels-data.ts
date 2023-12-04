import { Types } from 'mongoose';
import { EChannelRoles, ICreateDmChannel, ICreateGroupDto, IUpdateGroupDto } from '../modules';
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

export const mockCreateChannelPayload: ICreateDmChannel = {
  type: 'dm',
  users: [mockUser.id]
};

export const mockCreateGroupPayload: ICreateGroupDto = {
  name: 'channel name',
  desc: 'mock channel desc',
  users: [mockUser.id],
  roles: [{
    user: mockUser.id as string,
    role: EChannelRoles.OWNER
  }]
};

export const mockUpdateChannelPayload: IUpdateGroupDto = {
  name: 'channel name',
  desc: 'mock channel desc'
};

export const mockUpdateGroupPayload: IUpdateGroupDto = {
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
