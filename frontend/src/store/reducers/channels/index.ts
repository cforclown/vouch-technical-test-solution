
import { createSlice } from '@reduxjs/toolkit';
import { IUser } from '@/utils/common';
import { IExplorationResConfig } from '@/utils/exploration/exploration';
import { EPaginationSortOrders } from '@/utils/exploration/pagination';

export enum EChannelRoles {
  OWNER='owner',
  ADMIN='admin',
  MEMBER='member'
}

export interface IChannelUserRole {
  user: string;
  role: EChannelRoles;
}

export interface IMessage {
  _id: string;
  id: string;
  channel: string;
  sender: string;
  text: string;
  createdAt?: Date;
  updatedAt?: Date;
  archived?: boolean;
}

export interface IChannel {
  _id: string;
  id: string;
  name?: string; // only when type==='group'
  type: 'dm' | 'group';
  desc?: string;
  users: IUser[];
  roles?: IChannelUserRole[]; //  undefined if type==='dm'
  messages: IMessage[];
  createdAt?: Date;
  updatedAt?: Date;
  archived?: boolean;
}

export interface IChannelsState {
  loading: boolean;
  channels: IChannel[];
  exploration: IExplorationResConfig;
  msgsLoading: boolean;
  msgs: IMessage[];
}

const channelsInitialState: IChannelsState = {
  loading: false,
  channels: [],
  exploration: {  
    pagination: {
      page: 1,
      limit: 25,
      sort: {
        by: 'createdAt',
        order: EPaginationSortOrders.DESC
      },
      pageCount: 0
    } 
  },
  msgsLoading: true,
  msgs: []
};


const channelsSlice = createSlice({
  name: 'channels',
  initialState: channelsInitialState,
  reducers: {
    setChannelsLoading(state, action) {
      state.loading = action.payload;
    },
    setChannelsData(state, action) {
      state.channels = action.payload;
    },
    setExploration(state, action) {
      state.exploration = action.payload;
    },
    resetExploration(state) {
      state.exploration = {
        pagination: {
          page: 1,
          limit: 25,
          sort: {
            by: 'createdAt',
            order: EPaginationSortOrders.DESC
          },
          pageCount: 1
        } 
      };
    }
  }
});

export const { 
  setChannelsLoading, 
  setChannelsData,
  setExploration
} = channelsSlice.actions;

export default channelsSlice.reducer;
