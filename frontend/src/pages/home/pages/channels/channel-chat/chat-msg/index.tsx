import styled from 'styled-components';
import { twMerge } from 'tailwind-merge';

export interface IChatMsg {
  text: string;
  isFromYou?: boolean;
}

const ChatBubble = styled.div<Omit<IChatMsg, 'text'>>`
  position: relative;
  max-width: 50%;
  background-color: ${({ isFromYou }) => isFromYou ? '#5Db075' : '#E8E8E8'};
  border-radius: 6px 6px ${({ isFromYou }) => isFromYou ? '0 6px' : '6px 0'};
  color: white;
  text-wrap: wrap;
  word-wrap: break-word;
  display: inline-block;
  text-align: left;

  &:after{
    content: ' ';
    position: absolute;
    width: 0;
    height: 0;
    left: auto;
    right: 0px;
    bottom: -12px;
    border: 6px solid;
    border-color: ${({ isFromYou }) => {
    if (isFromYou) {
      return '#5Db075 #5Db075 transparent transparent';
    }
        
    return '#E8E8E8 transparent transparent #E8E8E8';
  }};
  }
`;

function ChatMsg({ text, isFromYou }: IChatMsg) {
  return (
    <div className={twMerge('w-full flex', isFromYou ? 'justify-end' : 'justify-end')}>
      <ChatBubble className="px-4 py-2" isFromYou={isFromYou}>
        {text}
      </ChatBubble>
    </div>
  );
}

export default ChatMsg;
