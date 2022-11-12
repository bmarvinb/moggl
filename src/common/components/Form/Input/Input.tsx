import { clsx } from 'clsx';
import React from 'react';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
  className?: string;
  disabled?: boolean;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, invalid, ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={clsx(
          'block w-full min-w-0 flex-1 rounded border bg-neutral-50 p-2 text-neutral-900 placeholder-neutral-600 focus:outline-none focus:ring-2 dark:bg-neutral-dark-400 dark:text-neutral-dark-900 dark:placeholder-neutral-dark-600',
          invalid
            ? 'border-red-400 focus:ring-red-300 dark:border-red-dark-400 dark:focus:ring-red-dark-400'
            : 'border-neutral-200 focus:border-primary-400 focus:ring-primary-300 dark:border-neutral-dark-300 dark:focus:border-primary-dark-400 dark:focus:ring-primary-dark-300',
          disabled &&
            'dark:placeholder-dark-600 bg-neutral-300/25 placeholder-neutral-600 dark:bg-neutral-dark-300/25',
          className,
        )}
        aria-invalid={invalid ? 'true' : 'false'}
        disabled={disabled}
        {...rest}
      />
    );
  },
);

Input.displayName = 'Input';
