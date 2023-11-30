import { ITheme } from './Themes';

declare module 'styled-components' {
  export type DefaultTheme = ITheme
}
