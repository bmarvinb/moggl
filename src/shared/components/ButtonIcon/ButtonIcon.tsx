import React from 'react';
import { classes } from 'shared/components/ButtonIcon/styles';
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
