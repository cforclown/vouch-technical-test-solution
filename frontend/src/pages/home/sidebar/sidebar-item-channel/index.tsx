import UserAvatar from '@/components/user-avatar';
import { IChannel } from '@/store/reducers/channels';
import { IUser } from '@/utils/common';
import { MenuItem } from 'react-pro-sidebar';
import { matchPath, useNavigate } from 'react-router-dom';


interface ISidebarMenuItem {
  channel: IChannel;
  user?: IUser;
}
export default function SidebarItemChannel({ channel, user }: ISidebarMenuItem): JSX.Element {
  const navigate = useNavigate();

  return (
    <MenuItem 
      active={!!matchPath('/channels/*', location.pathname)} 
      icon={<UserAvatar size="lg" />}
      onClick={() => navigate(`/channels/${channel.id}`)}
    >
      {user?.fullname ?? channel.name}
    </MenuItem>
  );
}
