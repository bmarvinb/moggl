import React from 'react';
import { clsx } from 'clsx';

const variants = {
  ghost: 'focus:ring-2 focus:ring-offset-0 focus:ring-primary-300',
  transparent:
    'hover:text-primary-400 dark:hover:text-primary-dark-400 text-neutral-800 dark:text-neutral-dark-800 focus:ring-primary-400 dark:focus:ring-primary-dark-400',
};

const sizes = {
  md: 'p-0.5 text-md',
  lg: 'p-1 text-lg',
  xl: 'p-1 text-xl',
  '2xl': 'p-1 text-2xl',
  '3xl': 'p-1 text-3xl',
};

export type ButtonIconProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactElement;
  type?: 'reset' | 'button' | 'submit';
  size?: keyof typeof sizes;
  variant?: keyof typeof variants;
  className?: string;
};

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  (
    { icon, variant = 'transparent', size = 'md', className, type, ...rest },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          'inline-flex items-center rounded-md border border-transparent font-medium focus:outline-none focus:ring-2',
          variants[variant],
          sizes[size],
          className,
        )}
        {...rest}
      >
        {icon}
      </button>
    );
  },
);
ButtonIcon.displayName = 'ButtonIcon';
