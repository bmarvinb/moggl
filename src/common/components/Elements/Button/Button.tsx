import { clsx } from 'clsx';
import React from 'react';
import { Spinner } from 'common/components/Elements/Spinner';

const sizes = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-2 text-base',
  xl: 'px-6 py-3 text-base',
};

const variants = {
  primary: clsx(
    'text-neutral-50 bg-primary-400 dark:bg-primary-dark-400 dark:text-neutral-dark-900 focus:ring-2 focus:ring-offset-0 focus:ring-primary-300 hover:bg-primary-500 dark:hover:bg-primary-500',
  ),
};

const rounds = {
  none: clsx('rounded-none'),
  md: clsx('rounded-md'),
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  round?: keyof typeof rounds;
  children?: React.ReactNode;
  className?: string;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      loading,
      disabled,
      leftIcon,
      rightIcon,
      children,
      className,
      type = 'button',
      size = 'md',
      variant = 'primary',
      round = 'md',
      ...rest
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        className={clsx(
          `inline-flex items-center border border-transparent font-medium shadow-sm focus:outline-none focus:ring-2`,
          sizes[size],
          variants[variant],
          rounds[round],
          disabled &&
            `dark:bg-neutral-dark-30 cursor-not-allowed bg-neutral-300 hover:bg-neutral-300 dark:hover:bg-neutral-dark-300`,
          className,
        )}
        disabled={disabled}
        aria-disabled={disabled}
        {...rest}
      >
        {leftIcon && !loading ? leftIcon : null}
        {loading && <Spinner className="absolute" size="sm" />}
        {loading ? <span className="opacity-0">{children}</span> : children}
        {rightIcon && !loading ? rightIcon : null}
      </button>
    );
  },
);
Button.displayName = 'Button';
