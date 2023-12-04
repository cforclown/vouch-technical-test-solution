import { selectChannelsState } from '@/store/reducers/channels/channels-selectors';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChatForm from './channel-chat-form';
import Loader from '@/components/loader/Loader.style';

function Chat(): JSX.Element {
  const channelsState = useSelector(selectChannelsState());
  const { channelId } = useParams();
  const channel = channelsState.channels.find(c => c.id === channelId);

  if (!channel) {
    return (
      <Loader />
    );
  }

  return (
    <ChatForm 
      channel={channel}
      exploration={channelsState.exploration}
      msgs={channelsState.msgs}
      msgsNextPage={() => {}}
      sendMsg={() => {}}
    />
  );
}

export default Chat;
