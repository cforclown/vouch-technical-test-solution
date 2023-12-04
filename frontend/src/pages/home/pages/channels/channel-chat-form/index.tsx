import { useRef } from 'react';
import Spinner from '@/components/spinner/Spinner';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import OverflowContainer from '@/components/overflow-container';
import ChatMsg from './chat-msg';
import withUserContext, { IWithUserContext } from '@/components/HOC/withUserContext';
import { IChannel, IMessage } from '@/store/reducers/channels';
import { IExplorationResConfig } from '@/utils/exploration/exploration';

export interface IChatbotForm extends IWithUserContext {
  channel: IChannel;
  msgs: IMessage[];
  exploration: IExplorationResConfig;
  msgsNextPage(): void;
  sendMsg(text: string): void;
  typing?: boolean;
}

function ChatForm({
  userContext: { user },
  msgs,
  sendMsg,
  typing,
}: IChatbotForm): JSX.Element {
  const endScrollRef = useRef<HTMLDivElement>(null);
  const msgsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onScroll = (): void => {
    // console.log('scrolling');
  };

  const onInputKeyDown = (e: any): void => {
    if (e.key !== 'Enter') {
      return;
    }

    if (!e.shiftKey && inputRef.current?.value && inputRef.current?.value !== '') {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = (e?: any): void => {
    if (!inputRef.current) {
      return;
    }

    e?.preventDefault();
    sendMsg(inputRef.current.value);
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-start relative overflow-hidden">
      <OverflowContainer ref={msgsContainerRef} className="px-5" onScroll={() => onScroll()}>
        {msgs.map((msg, i) => (
          <ChatMsg key={i} text={msg.text} isFromYou={msg.sender === user.id} />
        ))}
        <div className="p-3">
          {typing && <Spinner />}
        </div>
        <div ref={endScrollRef} />
      </OverflowContainer>

      <div className="w-full flex justify-center items-center px-5 py-4">
        <Input
          ref={inputRef}
          className="w-full me-3"
          style={{ height: '44px' }}
          placeholder="Type your message here"
          onKeyDown={onInputKeyDown}
        />
        <Button
          type="submit"
          className="p-[0.4rem] h-[44px]"
          style={{ padding: '0.4rem', height: '44px' }}
          onClick={onSubmit}
        >
          <PaperPlaneIcon />
        </Button>
      </div>
    </div>
  );
}

export default withUserContext(ChatForm);
