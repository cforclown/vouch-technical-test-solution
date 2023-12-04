import { useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import OverflowContainer from '@/components/overflow-container';
import withUserContext, { IWithUserContext } from '@/components/HOC/withUserContext';
import { IUser } from '@/utils/common';

export interface IChatDummyForm extends IWithUserContext {
  withUser: IUser;
  sendMsg(text: string): void;
}

function ChatDummyForm({
  userContext: { user }
}: IChatDummyForm): JSX.Element {
  const msgsContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

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
  };

  return (
    <div className="w-full h-full flex flex-col justify-center items-start relative overflow-hidden">
      <OverflowContainer ref={msgsContainerRef} className="px-5" onScroll={() => onScroll()} />

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

export default withUserContext(ChatDummyForm);
