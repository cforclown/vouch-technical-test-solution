import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import UserAvatar from '@/components/user-avatar';
import { IChannel } from '@/store/reducers/channels';
import { IUser } from '@/utils/common';
import { MenuItem } from 'react-pro-sidebar';
import { matchPath, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

interface ISidebarMenuItem {
  channel: IChannel;
  user?: IUser;
}

const Container = styled.div`
  position: relative;
  color: ${({ theme }) => theme.sidebar.itemTextColor};

  > label {
    max-width: 132px;
    text-overflow: ellipsis;
    overflow: hidden;

    &.last-msg {
      color: ${({ theme }) => theme.sidebar.itemTextColor}bb;
    }
  }
`;

export default function SidebarItemChannel({ channel, user }: ISidebarMenuItem): JSX.Element {
  const navigate = useNavigate();

  return (
    <MenuItem 
      active={!!matchPath(`/channels/${channel.id}`, location.pathname)} 
      // icon={<UserAvatar className="my-4" size="lg" src={user?.id ?? channel.id} />}
      onClick={() => navigate(`/channels/${channel.id}`)}
    >
      <div className="flex flex-row justify-start items-center gap-2">
        <UserAvatar className="my-4" size="xl" src={user?.id ?? channel.id} />
        <Container className="flex flex-col justify-center items-start gap-1">
          <Label className="font-bold">{user?.fullname ?? channel.name}</Label>
          <Label className="last-msg">{channel.lastMessage}</Label>
          {(channel.unreadMessages && channel.unreadMessages > 0) ? (
            <Badge variant="destructive" className="absolute right-0 top-0 bottomt-0 mx-0 my-auto px-2 py-1">{channel.unreadMessages}</Badge>
          ) : null}
        </Container>
      </div>
    </MenuItem>
  );
}
