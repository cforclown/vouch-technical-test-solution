import { IChannel, IMessage } from '@/store/reducers/channels';
import { callProtectedMainAPI, getAPIEndpoint } from '@/utils/call-api';

export const getChannels = () => callProtectedMainAPI(getAPIEndpoint('/channels'));
export const startConversation = (receiver: string, text: string): Promise<IChannel> => callProtectedMainAPI(
  getAPIEndpoint('/messages/new', 'POST'), 
  { receiver, text }
);

export const getChannelMsgs = (channel: string): Promise<IMessage[]> => callProtectedMainAPI(getAPIEndpoint(`/messages/${channel}`));

export const sendMsg = (channel: string, text: string) => callProtectedMainAPI(
  getAPIEndpoint(`/messages/${channel}`, 'PUT'),
  { text }
);

export const readMsgs = (channel: string) => callProtectedMainAPI(getAPIEndpoint(`/messages/read/${channel}`, 'PUT'));
