import React from 'react';
import { Spinner } from 'shared/components/Spinner/Spinner';
import { cn } from 'theme/utils';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonVariant = 'primary';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  disabled?: boolean;
  type?: 'button' | 'reset' | 'submit';
  leftIcon?: React.ReactElement;
  rightIcon?: React.ReactElement;
  size?: ButtonSize;
  variant?: ButtonVariant;
  children?: React.ReactNode;
  className?: string;
};

function classes(size: ButtonSize, variant: ButtonVariant, disabled?: boolean) {
  const sizes: Record<ButtonSize, string> = {
    xs: 'px-2.5 py-1.5 text-xs',
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-4 py-2 text-base',
    xl: 'px-6 py-3 text-base',
  };
  const variants: Record<ButtonVariant, string> = {
    primary:
      'text-neutral-50 dark:text-neutralDark-900 bg-primary-400 dark:bg-primaryDark-400 hover:bg-primary-500 dark:hover:bg-primary-500 focus:ring-primary-400 dark:focus:ring-primaryDark-400',
  };
  return cn(
    'inline-flex items-center border border-transparent font-medium rounded-md shadow-sm focus:outline-none focus:ring-2',
    sizes[size],
    variants[variant],
    disabled &&
      'cursor-not-allowed bg-neutral-300 dark:bg-neutralDark-300 hover:bg-neutral-300 dark:hover:bg-neutralDark-300',
  );
}

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
      ...rest
    },
    ref,
  ) => {
    const buttonClasses = classes(size, variant, disabled);
    return (
      <button
        ref={ref}
        type={type}
        className={cn(buttonClasses, className)}
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
