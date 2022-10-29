import {
  ButtonIconSize,
  ButtonIconVariant,
} from 'shared/components/ButtonIcon/ButtonIcon';
import { cn } from 'theme/utils';

const baseClasses =
  'inline-flex border border-transparent items-center font-medium rounded-full focus:outline-none focus:ring-2';

const variants: Record<ButtonIconVariant, string> = {
  transparent:
    'hover:text-primary-400 dark:hover:text-primaryDark-400 text-neutral-50 dark:text-neutralDark-900 focus:ring-primary-400 dark:focus:ring-primaryDark-400',
};

const sizes: Record<ButtonIconSize, string> = {
  md: 'p-1',
};

export const classes = (variant: ButtonIconVariant, size: ButtonIconSize) =>
  cn(baseClasses, variants[variant], sizes[size]);
