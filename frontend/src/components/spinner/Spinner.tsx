import { useSelector } from 'react-redux';
import { PulseLoader } from 'react-spinners';
import { LoaderSizeMarginProps } from 'react-spinners/helpers/props';
import { selectThemeMain } from '@/store/reducers/layout/theme-selector';

export interface ISpinner extends LoaderSizeMarginProps {
  className?: string
}

const Spinner = (props: ISpinner): JSX.Element => {
  const themeMain = useSelector(selectThemeMain);
  return <PulseLoader color={themeMain.background} {...props} />;
};

export default Spinner;
