import React from 'react';
import { DefaultProps } from 'theme/types';
import { cn } from 'theme/utils';

export type ButtonIconVariant = 'transparent';

export type ButtonIconSize = 'md';

export type ButtonIconProps = DefaultProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    icon: React.ReactElement;
    type?: 'reset' | 'button' | 'submit';
    size?: ButtonIconSize;
    variant?: ButtonIconVariant;
  };

function classes(variant: ButtonIconVariant, size: ButtonIconSize) {
  const variants: Record<ButtonIconVariant, string> = {
    transparent:
      'hover:text-primary-400 dark:hover:text-primaryDark-400 text-neutral-800 dark:text-neutralDark-800 focus:ring-primary-400 dark:focus:ring-primaryDark-400',
  };
  const sizes: Record<ButtonIconSize, string> = {
    md: 'p-1',
  };
  return cn(
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
      <button ref={ref} className={cn(buttonIconClasses, className)} {...rest}>
        {icon}
      </button>
    );
  },
);
ButtonIcon.displayName = 'ButtonIcon';
