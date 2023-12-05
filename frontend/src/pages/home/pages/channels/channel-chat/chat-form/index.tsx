import { useRef } from 'react';
import { PaperPlaneIcon } from '@radix-ui/react-icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface IChatForm {
  submit(text: string): void;
}

function ChatForm({ submit }: IChatForm) {
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
    submit(inputRef.current.value);
    inputRef.current.value = '';
  };

  return (
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
        className="p-0 w-[50px] h-[44px] rounded-full"
        onClick={onSubmit}
      >
        <PaperPlaneIcon />
      </Button>
    </div>
  );
}

export default ChatForm;
