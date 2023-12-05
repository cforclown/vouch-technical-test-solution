import { Label } from '@/components/ui/label';
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
      active={!!matchPath(`/channels/${channel.id}`, location.pathname)} 
      icon={<UserAvatar size="lg" src={user?.id ?? channel.id} />}
      onClick={() => navigate(`/channels/${channel.id}`)}
    >
      <div className="flex flex-col justify-center items-start gap-1">
        <Label className="font-bold">{user?.fullname ?? channel.name}</Label>
      </div>
    </MenuItem>
  );
}
