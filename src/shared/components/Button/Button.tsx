import React from 'react';
import { classes } from 'shared/components/Button/styles';
import { Spinner } from 'shared/components/Spinner';
import { DefaultProps } from 'theme/types';
import { cn } from 'theme/utils';

export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type ButtonVariant = 'primary';

export type ButtonProps = DefaultProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
    disabled?: boolean;
    type?: 'button' | 'submit';
    leftIcon?: React.ReactElement;
    rightIcon?: React.ReactElement;
    size?: ButtonSize;
    variant?: ButtonVariant;
    children?: React.ReactNode;
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
