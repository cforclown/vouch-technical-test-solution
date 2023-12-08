import { useEffect, useRef, useState } from 'react';
import Spinner from '@/components/spinner/Spinner';
import OverflowContainer from '@/components/overflow-container';
import Message from '../message';
import withUserContext, { IWithUserContext } from '@/components/HOC/withUserContext';
import { IMessage } from '@/store/reducers/channels';
import MessageForm from '../message-form';
import { pushMsg as pushMsgAction } from '@/store/reducers/messages';
import useAction from '@/hooks/useAction';
import { sendMsg } from '../../channels.service';
import Loader from '@/components/loader/Loader.style';

export interface IMessages extends IWithUserContext {
  channel: string;
  fetchingMsgs?: boolean;
  msgs: IMessage[];
  typing?: boolean;
}

function Messages({
  userContext: { user },
  channel,
  fetchingMsgs,
  msgs,
  typing,
}: IMessages): JSX.Element {
  const endScrollRef = useRef<HTMLDivElement>(null);
  const msgsContainerRef = useRef<HTMLDivElement>(null);
  const pushMsg = useAction(pushMsgAction);
  const [lastMsg, setLastMsg] = useState<IMessage | undefined>(msgs.length ? msgs[msgs.length - 1] : undefined);

  useEffect(() =>{
    const currentLastMsg = msgs.length ? msgs[msgs.length - 1] : undefined;
    if (msgs.length && lastMsg?.id !== currentLastMsg?.id) {
      scrollToBottom('auto');
    }
    setLastMsg(currentLastMsg);
  }, [msgs]);

  const onSubmit = async (text: string): Promise<void> => {
    const newMsg = await sendMsg(channel, text);
    pushMsg(newMsg);
  };

  const scrollTo = (to: number, behavior: 'auto' | 'smooth' = 'auto'): void => {
    msgsContainerRef.current?.scrollTo({
      top: to,
      behavior
    });
  };

  const scrollToBottom = (behavior: 'auto' | 'smooth' = 'smooth'): void => {
    if (!msgsContainerRef.current) {
      return;
    } 

    scrollTo(msgsContainerRef.current.scrollHeight, behavior);
  };

  if (fetchingMsgs && !msgs.length){
    return ( <Loader />);
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-start relative overflow-hidden">
      <OverflowContainer ref={msgsContainerRef} className="gap-6 p-5">
        {msgs.map((msg, i) => (
          <Message key={i} text={msg.text} isFromYou={msg.sender === user.id} />
        ))}
        <div className="p-3">
          {typing && <Spinner />}
        </div>
        <div ref={endScrollRef} />
      </OverflowContainer>

      <MessageForm submit={onSubmit} />
    </div>
  );
}

export default withUserContext(Messages);
