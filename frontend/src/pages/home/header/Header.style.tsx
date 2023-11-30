import styled from 'styled-components';

import HeaderBase from './Header';

const Header = styled(HeaderBase)`
  width: 100%;
  height: 56px;

  #cl-header {
    width: 100%;
    height: 56px;
    background-color: ${(props) => props.theme.header.background};

    margin: 0;
    padding: 0rem 1rem;

    color: ${(props) => props.theme.header.color};

    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    box-shadow: 1px 3px 6px ${(props) => props.theme.header.background}40;

    .cl-header-left {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: center;
    }

    .cl-header-center {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: center;
    }

    .cl-header-right {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: center;
    }

    .cl-header-sidebar-toggle-btn {
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
    .cl-header-sidebar-toggle-btn-hidden {
      visibility: collapse;
    }
    .cl-header-sidebar-toggle-btn:hover {
      box-shadow: 0px 0px 4px ${(props) => props.theme.header.color}cc;
    }
  }
`;

Header.displayName = 'Header';

export default Header;
