import { useEffect, useRef } from 'react';
import Spinner from '@/components/spinner/Spinner';
import OverflowContainer from '@/components/overflow-container';
import ChatMsg from '../chat-msg';
import withUserContext, { IWithUserContext } from '@/components/HOC/withUserContext';
import { IMessage } from '@/store/reducers/channels';
import ChatForm from '../chat-form';
import { pushMsg as pushMsgAction } from '@/store/reducers/messages';
import useAction from '@/hooks/useAction';
import { sendMsg } from '../../channels.service';

export interface IChatbotForm extends IWithUserContext {
  channel: string;
  msgs: IMessage[];
  typing?: boolean;
}

function ChatContainer({
  userContext: { user },
  channel,
  msgs,
  typing,
}: IChatbotForm): JSX.Element {
  const endScrollRef = useRef<HTMLDivElement>(null);
  const msgsContainerRef = useRef<HTMLDivElement>(null);
  const pushMsg = useAction(pushMsgAction);

  useEffect(() =>{
    scrollToBottom('auto');
  }, []);

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


  return (
    <div className="w-full h-full flex flex-col justify-center items-start relative overflow-hidden">
      <OverflowContainer ref={msgsContainerRef} className="gap-6 p-5">
        {msgs.map((msg, i) => (
          <ChatMsg key={i} text={msg.text} isFromYou={msg.sender === user.id} />
        ))}
        <div className="p-3">
          {typing && <Spinner />}
        </div>
        <div ref={endScrollRef} />
      </OverflowContainer>

      <ChatForm submit={onSubmit} />
    </div>
  );
}

export default withUserContext(ChatContainer);
