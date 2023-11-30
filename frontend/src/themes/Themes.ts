const sidebarPrimaryBg = '/images/sidebar-bg-primary.jpg';

export enum ThemeTypes {
  PRIMARY = 'PRIMARY',
  LIGHT = 'LIGHT',
  DARK ='DARK',
  RED ='RED',
  PURPLE = 'PURPLE',
}

export interface IThemeSidebar {
  background: string;
  color: string;
  img?: string;
  itemColor?: string;
  itemActiveColor?: string;
  itemBg?: string;
  itemActiveBg?: string;
  itemIconWrapper?: string; // color
}

export interface IThemeHeader {
  background: string;
  color: string;
}

export interface IThemeMain {
  background: string;
  color: string;
}

export interface ITheme {
  id: ThemeTypes;
  body: string;
  text: string;
  border: string;
  main: IThemeMain;
  sidebar: IThemeSidebar
  header: IThemeHeader
}

export const primaryTheme: ITheme = {
  id: ThemeTypes.PRIMARY,
  body: '#fff',
  text: '#3d3d3d',
  border: '#ced6e0',
  main: {
    background: '#f53b57',
    color: '#ffffff',
  },
  sidebar: {
    background: '#222f3e',
    color: '#ffffff',
    img: sidebarPrimaryBg,
    itemActiveColor: '#ffffff',
    itemActiveBg: '#f53b57',
    itemIconWrapper: '#3d3d3d',
  },
  header: {
    background: '#f53b57',
    color: '#ffffff',
  },
};

export const lightTheme: ITheme = {
  id: ThemeTypes.LIGHT,
  body: '#fff',
  text: '#3d3d3d',
  border: '#ced6e0',
  main: {
    background: '#a4b0be',
    color: '#3d3d3d',
  },
  sidebar: {
    background: '#2f3542',
    color: '#f1f2f6',
  },
  header: {
    background: '#a4b0be',
    color: '#3d3d3d',
  },
};

export const darkTheme: ITheme = {
  id: ThemeTypes.DARK,
  body: '#2f3542',
  text: '#f1f2f6',
  border: '#747d8c',
  main: {
    background: '#3d3d3d',
    color: '#3d3d3d',
  },
  sidebar: {
    background: '#3d3d3d',
    color: '#f1f2f6',
  },
  header: {
    background: '#3d3d3d',
    color: '#3d3d3d',
  },
};

export const redTheme: ITheme = {
  id: ThemeTypes.RED,
  body: '#fff',
  text: '#3d3d3d',
  border: '#ced6e0',
  main: {
    background: '#ef5777',
    color: '#3d3d3d',
  },
  sidebar: {
    background: '#f53b57',
    color: '#f1f2f6',
  },
  header: {
    background: '#ef5777',
    color: '#3d3d3d',
  },
};

export const purpleTheme: ITheme = {
  id: ThemeTypes.PURPLE,
  body: '#8854d0',
  text: '#3d3d3d',
  border: '#ced6e0',
  main: {
    background: '#a55eea',
    color: '#3d3d3d',
  },
  sidebar: {
    background: '#8854d0',
    color: '#f1f2f6',
  },
  header: {
    background: '#a55eea',
    color: '#3d3d3d',
  },
};

const Themes: Record<ThemeTypes, ITheme> = {
  [ThemeTypes.PRIMARY]: primaryTheme,
  [ThemeTypes.LIGHT]: lightTheme,
  [ThemeTypes.DARK]: darkTheme,
  [ThemeTypes.RED]: redTheme,
  [ThemeTypes.PURPLE]: purpleTheme,
};

export const getTheme = (themeId: ThemeTypes): ITheme => Themes[themeId];

export default Themes;
