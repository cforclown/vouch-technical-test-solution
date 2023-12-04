import withUserContext, { IWithUserContext } from '@/components/HOC/withUserContext';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { deleteUserContext } from '@/store/reducers/user-context';
import { DotsVerticalIcon, RowsIcon } from '@radix-ui/react-icons';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 73px;  /* should be same as sidebar header height */
  
  background-color: ${(props) => props.theme.header.background};

  margin: 0;
  padding: 0rem 1rem;

  color: ${(props) => props.theme.header.color};

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  box-shadow: 1px 3px 6px ${(props) => props.theme.header.background}40;

  .header-left {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  }

  .header-center {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }

  .header-right {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
  }

  .header-sidebar-toggle-btn {
    border: 1px solid ${(props) => props.theme.header.color};
    border-radius: 4px;
    padding: 4px 8px;

    cursor: pointer;

    visibility: visible;

    transition: all 0.2s ease-in-out;
    -webkit-transition: all 0.2s ease-in-out;
    -moz-transition: all 0.2s ease-in-out;
    -ms-transition: all 0.2s ease-in-out;
    -o-transition: all 0.2s ease-in-out;
  }
  .header-sidebar-toggle-btn-hidden {
    visibility: collapse;
  }
  .header-sidebar-toggle-btn:hover {
    box-shadow: 0px 0px 4px ${(props) => props.theme.header.color}cc;
  }
`;

interface IHeaderProps extends IWithUserContext{
  showSidebarToggler: boolean;
  onToggleSidebar: ()=>void;
}

export const HeaderBase = ({ showSidebarToggler, onToggleSidebar, t, navigate }: IHeaderProps): JSX.Element => {
  const dispatch = useDispatch();

  const onToggleSidebarClick = (): void => {
    if (!onToggleSidebar) return;
    onToggleSidebar();
  };

  const logout = () => {
    dispatch(deleteUserContext());
    navigate('/auth/signin');
  };

  return (
    <Container>
      <div className="header-left">
        {showSidebarToggler && (
          <div className="header-sidebar-toggle-btn" onClick={onToggleSidebarClick}>
            <RowsIcon className="h-[24px]" />
          </div>
        )}
      </div>
      <div className="header-center" />
      <div className="header-right" >
        <DropdownMenu>
          <DropdownMenuTrigger>
            <DotsVerticalIcon className="w-[28px] h-[28px]" />
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuLabel>
              {t('common.account')}
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              {t('common.profile')}
            </DropdownMenuItem>
            <DropdownMenuItem>
              {t('common.settings')}
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem onClick={logout}>
              {t('common.logout')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </Container>
  );
};

export default withUserContext(HeaderBase);
