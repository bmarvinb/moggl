import React from 'react';
import { DefaultProps } from 'theme/types';
import { cn } from 'theme/utils';

export type InputProps = DefaultProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    size?: 'md';
  };

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ size = 'md', className, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={cn(
          'text-neutral-50 dark:text-neutralDark-900 bg-neutral-50 border border-neutral-200 dark:border-neutralDark-300 p-2 placeholder-neutral-700 focus:outline-none focus:ring-2 dark:placeholder-neutralDark-700 dark:bg-neutralDark-400 flex-1 focus:ring-primary-400 focus:border-primary-400 block w-full min-w-0 rounded sm:text-sm  ',
          className,
        )}
        {...rest}
      />
    );
  },
);
Input.displayName = 'Input';
