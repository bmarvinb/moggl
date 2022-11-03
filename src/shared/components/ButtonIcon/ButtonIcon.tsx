import React from 'react';
import { clsx } from 'clsx';

export type ButtonIconVariant = 'transparent';

export type ButtonIconSize = 'md';

export type ButtonIconProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon: React.ReactElement;
  type?: 'reset' | 'button' | 'submit';
  size?: ButtonIconSize;
  variant?: ButtonIconVariant;
  className?: string;
};

function classes(variant: ButtonIconVariant, size: ButtonIconSize) {
  const variants: Record<ButtonIconVariant, string> = {
    transparent:
      'hover:text-primary-400 dark:hover:text-primary-dark-400 text-neutral-800 dark:text-neutral-dark-800 focus:ring-primary-400 dark:focus:ring-primary-dark-400',
  };
  const sizes: Record<ButtonIconSize, string> = {
    md: 'p-1',
  };
  return clsx(
    'inline-flex border border-transparent items-center font-medium rounded-full focus:outline-none focus:ring-2',
    variants[variant],
    sizes[size],
  );
}

export const ButtonIcon = React.forwardRef<HTMLButtonElement, ButtonIconProps>(
  (
    { icon, variant = 'transparent', size = 'md', className, type, ...rest },
    ref,
  ) => {
    const buttonIconClasses = classes(variant, size);
    return (
      <button
        ref={ref}
        className={clsx(buttonIconClasses, className)}
        {...rest}
      >
        {icon}
      </button>
    );
  },
);
ButtonIcon.displayName = 'ButtonIcon';
