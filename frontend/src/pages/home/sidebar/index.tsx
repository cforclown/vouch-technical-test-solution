import { ComponentType, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Menu, MenuItem, Sidebar as ReactProSidebar, menuClasses } from 'react-pro-sidebar';
import { matchPath, useNavigate } from 'react-router-dom';
import { CalendarIcon } from '@radix-ui/react-icons';
import { IconProps } from '@radix-ui/react-icons/dist/types';
import { selectTheme } from '@/store/reducers/layout/theme-selector';
import styled from 'styled-components';

export interface ISidebar {
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
  const theme = useSelector(selectTheme);
  const ismounted = useRef(false);

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
        {/* HEADER */}
        <div className="w-full overflow-hidden flex justify-center items-center my-2" style={{ height: '56px' }}>
          <img
            className="h-[90%]"
            src={`/images/${collapsed ? 'sidebar-collapsed-banner.png' : 'sidebar-banner.png'}`}
            style={{ 
              objectFit: 'cover'
            }}
            alt="/images/sidebar-collapsed-banner.png"
          />
        </div>

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
          <SidebarMenuItem path="/schedules" icon={CalendarIcon} label="Schedules" />
        </Menu>
      </div>
    </Container>
  );
}

interface ISidebarMenuItem {
  path: string;
  icon?: ComponentType<IconProps>;
  label: string;
}
function SidebarMenuItem({ path, icon: Icon }: ISidebarMenuItem): JSX.Element {
  const navigate = useNavigate();

  return (
    <MenuItem 
      active={!!matchPath(`${path}/*`, location.pathname)} 
      icon={Icon ? <Icon height={20} width={20}/> : undefined}
      onClick={() => navigate(`${path}`)}
    >
      Schedules
    </MenuItem>
  );
}

export default Sidebar;
