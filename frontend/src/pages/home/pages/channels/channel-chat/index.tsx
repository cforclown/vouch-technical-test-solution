import { useSelector } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import ChatContainer from './chat-container';
import ChatFormDummyContainer from './chat-container-temp';
import withUserContext from '@/components/HOC/withUserContext';
import Loader from '@/components/loader/Loader.style';
import useAction from '@/hooks/useAction';
import { selectChannelsState } from '@/store/reducers/channels/channels-selectors';
import { useEffect } from 'react';
import { selectMsgsState } from '@/store/reducers/messages/messages-selectors';
import { getMsgsAction } from '@/store/reducers/messages/messages-actions';
import { setSelectedChannelAction } from '@/store/reducers/channels/channels-actions';

function ChannelChat(): JSX.Element {
  const { channelId } = useParams();
  const channelsState = useSelector(selectChannelsState());
  const { loading: channelsLoading, channels } = channelsState;
  const { state } = useLocation();
  const setSelectedChannel = useAction(setSelectedChannelAction);
  const getMsgs = useAction(getMsgsAction);
  const { msgs, loading: msgsLoading } = useSelector(selectMsgsState());

  useEffect(() => {
    if (channelId === 'new' && state?.channel && state?.user) {
      setSelectedChannel(state.channel);
    }
  }, [channelId]);

  useEffect(() => {
    if (channelId === 'new') {
      return;
    }
    
    const channel = channels.find(c => c.id === channelId);
    if (!channel) {
      return;
    }

    getMsgs(channel.id);
  }, [channelId, channels]);

  if (channelsLoading) {
    return (
      <Loader />
    );
  }

  if (msgsLoading && channelId !== 'new') {
    if (!channels.find(c=>c.id === channelId)) {
      return (
        <Navigate to="/"/>
      );
    }

    return (
      <Loader />
    );
  }

  if (channelId === 'new') {
    if (!state?.channel || !state?.user) {
      return (
        <Navigate to="/"/>
      );
    }

    return (
      <ChatFormDummyContainer recipient={state.user} /> 
    );
  }
  
  if (!channelId) {
    return (
      <Navigate to="/"/>
    );
  }

  return (
    <ChatContainer 
      channel={channelId}
      msgs={msgs}
    />
  );
}

export default withUserContext(ChannelChat);
