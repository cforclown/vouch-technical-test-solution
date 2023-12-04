import { useEffect, useMemo, useRef } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { Menu, Sidebar as ReactProSidebar, menuClasses } from 'react-pro-sidebar';
import { selectTheme } from '@/store/reducers/layout/theme-selectors';
import SidebarHeader from './sidebar-header';
import { IUser } from '@/utils/common';
import withUserContext, { IWithUserContext } from '@/components/HOC/withUserContext';
import { selectChannels } from '@/store/reducers/channels/channels-selectors';
import { IChannel } from '@/store/reducers/channels';
import SidebarItemChannel from './sidebar-item-channel';

export interface ISidebar extends IWithUserContext {
  collapsed: boolean;
  hidden: boolean;
  onBreakpoint(onBreakpoint: boolean): void;
  onBackdropClick(): void;
  className?: string;
}

const Container = styled(ReactProSidebar)`
  background-color: ${props => props.theme.sidebar.background};
  box-shadow: 1px 3px 6px #00000040;
`;

function Sidebar({ collapsed, onBreakpoint, onBackdropClick, hidden }: ISidebar): JSX.Element {
  const theme = useSelector(selectTheme());
  const ismounted = useRef(false);
  const channels = useSelector(selectChannels());
  const normalizedChannels: (IChannel & { withUser?: IUser })[] = useMemo(() => channels.map(channel => ({
    ...channel,
    withUser: channel.type === 'group' ? undefined : channel.users.find(user => user.id !== user.id)
  })), [channels]);

  useEffect(() => {
    ismounted.current = true;
    return () => {
      ismounted.current = false;
    };
  }, []);

  return (
    <Container 
      width="220px"
      collapsed={collapsed} 
      toggled={!hidden}
      onBreakPoint={onBreakpoint}
      onBackdropClick={onBackdropClick}
      breakPoint="sm"
      backgroundColor={theme.sidebar.background}
    >
      <div className="h-screen flex flex-col justify-start items-start">
        <SidebarHeader collapsed={collapsed} />

        <Menu 
          className="w-full" 
          menuItemStyles={{
            button: {
              color: theme.sidebar.color,
              backgroundColor: theme.sidebar.background,
              '&:hover': {
                color: theme.sidebar.itemActiveColor ?? theme.sidebar.color,
                backgroundColor: theme.sidebar.itemActiveBg ?? theme.sidebar.itemActiveBg,
              },
              [`&.${menuClasses.active}`]: {
                color: theme.sidebar.itemActiveColor ?? theme.sidebar.color,
                backgroundColor: theme.sidebar.itemActiveBg ?? theme.sidebar.itemActiveBg,
              },
            },
          }}
        >
          {normalizedChannels.map((channel, i) => (
            <SidebarItemChannel key={i} channel={channel} user={channel.withUser} />
          ))}
        </Menu>
      </div>
    </Container>
  );
}

export default withUserContext(Sidebar);
