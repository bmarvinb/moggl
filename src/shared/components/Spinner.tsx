import React from 'react';
import { IconType } from 'react-icons';
import { BiLoaderAlt } from 'react-icons/bi';
import { DefaultProps } from 'theme/types';
import { cn } from 'theme/utils';

const sizes = {
  xs: 'w-3 h-3',
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

export type SpinnerProps = DefaultProps & {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
};

export const Spinner = ({ className, size = 'md' }: SpinnerProps) => {
  const styles = cn('animate-spin', sizes[size], className);
  return <BiLoaderAlt className={styles} />;
};

Spinner.defaultProps = {
  'aria-label': 'loading',
};
