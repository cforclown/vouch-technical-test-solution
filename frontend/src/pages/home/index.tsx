import { useCallback, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { twMerge } from 'tailwind-merge';
import { collapseSidebar, hideSidebar, setIsSM, showSidebar, uncollapseSidebar } from '@/store/reducers/layout';
import Header from './header';
import Content from './content';
import { selectTheme } from '@/store/reducers/layout/theme-selectors';
import { selectLayoutState } from '@/store/reducers/layout/layout-selectors';
import { MD_BREAKPOINT, SM_BREAKPOINT } from '@/utils/common';
import Sidebar from './sidebar';
import useAction from '@/hooks/useAction';
import { getChannelsAction } from '@/store/reducers/channels/channels-actions';

interface IHome {
  className?:string
}

function Home({ className }: IHome): JSX.Element {
  const ismounted = useRef(false);
  const dispatch = useDispatch();
  const theme = useSelector(selectTheme());
  const layoutState = useSelector(selectLayoutState());
  const getChannels = useAction(getChannelsAction);

  useEffect(() => {
    ismounted.current = true;
    getChannels();

    // UNMOUNT
    return () => {
      window.removeEventListener('resize', onresize);
      ismounted.current = false;
    };
  }, [layoutState.isSM]);

  useEffect(() => {
    window.addEventListener('resize', onresize);
    onresize();

    // UNMOUNT
    return () => {
      window.removeEventListener('resize', onresize);
    };
  }, [layoutState.isSM]);

  const onresize = useCallback(() => {
    const currentWidth = window.innerWidth;
    setSidebarCollapsed(currentWidth <= MD_BREAKPOINT);
    if (currentWidth <= SM_BREAKPOINT && !layoutState.isSM) {
      setLayoutIsSM(true);
    } else if (currentWidth > SM_BREAKPOINT && layoutState.isSM) {
      setLayoutIsSM(false);
    }
  }, [layoutState.isSM]);

  const setLayoutIsSM = (isSM: boolean): void => {
    dispatch(setIsSM(isSM));
  };

  const setSidebarCollapsed = (collapsed: boolean): void => {
    dispatch(collapsed ? collapseSidebar() : uncollapseSidebar());
  };

  const setSidebarHidden = (hide: boolean): void => {
    dispatch(hide ? hideSidebar() : showSidebar());
  };

  return (
    <div 
      className={twMerge(
        className, 
        'relative flex flex-row justify-start items-start h-screen overflow-hidden',
        `bg-${theme.body}`)
      }
    >
      <Sidebar 
        collapsed={layoutState.isSM ? false : layoutState.sidebarState.collapsed} 
        hidden={layoutState.sidebarState.hidden} 
        onBreakpoint={setSidebarHidden} 
        onBackdropClick={() => setSidebarHidden(true)} 
      />

      <div className="relative h-full w-full flex flex-col justify-start items-center">
        <Header showSidebarToggler={!!layoutState.sidebarState.hidden} onToggleSidebar={() => setSidebarHidden(false)} />
        <Content />
      </div>
    </div>
  );
}

export default Home;
