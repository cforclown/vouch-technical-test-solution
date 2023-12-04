import styled from 'styled-components';

export interface IChatMsg {
  text: string;
  isFromYou?: boolean;
}

const Container = styled.div<{isFromYou?: boolean}>`
  background-color: #DDDDDD;
  border-radius: 8px 8px ${({ isFromYou }) => isFromYou ? '0 8px' : '8px 0'};
`;

function ChatMsg({ text, isFromYou }: IChatMsg) {
  return (
    <Container isFromYou={isFromYou}>
      {text}
    </Container>
  );
}

export default ChatMsg;
