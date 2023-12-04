import { IExplorationResConfig } from '@/utils/exploration/exploration';
import { IChannel, IChannelsState, IMessage } from '.';
import { IAppState } from '../../index';

export const selectChannelsState = (): (state: IAppState) => IChannelsState => (state: IAppState) => state.channels;
export const selectChannels = (): (state: IAppState) => IChannel[] => (state: IAppState) => state.channels.channels;
export const selectChannelExploration = (): (state: IAppState) => IExplorationResConfig => (state: IAppState) => state.channels.exploration;
export const selectMsgs = (): (state: IAppState) => IMessage[] => (state: IAppState) => state.channels.msgs;
