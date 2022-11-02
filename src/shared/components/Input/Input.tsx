import React from 'react';
import { cn } from 'theme/utils';

export type InputSize = 'md';

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  size?: InputSize;
  invalid?: boolean;
  className?: string;
  disabled?: boolean;
};

function classes(invalid: boolean, disabled: boolean): string {
  return cn(
    'text-neutral-900 dark:text-neutral-dark-900 border p-2 focus:outline-none focus:ring-2 flex-1 block w-full min-w-0 rounded bg-neutral-50 dark:bg-neutral-dark-400 placeholder-neutral-700 dark:placeholder-neutral-dark-700',
    invalid
      ? 'border-red-400 dark:border-red-dark-400 focus:ring-red-400 dark:focus:ring-red-dark-400'
      : 'border-neutral-200 dark:border-neutral-dark-300 focus:ring-primary-300 dark:focus:ring-primary-dark-300 focus:border-primary-400 dark:focus:border-primary-dark-400',
    disabled &&
      'bg-neutral-300/25 dark:bg-neutral-dark-300/25 placeholder-neutral-600 dark:placeholder-dark-600',
  );
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, invalid, size = 'md', ...rest }, ref) => {
    const inputClasses = classes(!!invalid, !!disabled);
    return (
      <input
        ref={ref}
        className={cn(inputClasses, className)}
        aria-invalid={invalid ? 'true' : 'false'}
        disabled={disabled}
        {...rest}
      />
    );
  },
);
Input.displayName = 'Input';
