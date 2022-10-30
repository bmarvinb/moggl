import { BiLoaderAlt } from 'react-icons/bi';
import { cn } from 'theme/utils';

export type SpinnerProps = {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
};

const sizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export const Spinner = ({ className, size = 'md' }: SpinnerProps) => {
  const classes = cn('animate-spin', sizes[size], className);
  return <BiLoaderAlt className={classes} />;
};

Spinner.defaultProps = {
  'aria-label': 'loading',
};
