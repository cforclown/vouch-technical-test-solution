import { IAppState } from '../..';
import { ITheme, IThemeMain } from '../../../themes/Themes';

export const selectTheme = (): (state: IAppState) => ITheme => (state: IAppState) => state.layout.theme;
export const selectThemeMain = (state: IAppState): IThemeMain => {
  const theme = selectTheme()(state);
  return theme.main;
};
