import { ButtonSize, ButtonVariant } from 'shared/components/Button/Button';
import { cn } from 'theme/utils';

const baseClasses =
  'inline-flex items-center border border-transparent font-medium rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';

const sizes: Record<ButtonSize, string> = {
  xs: 'px-2.5 py-1.5 text-xs',
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2 text-base',
  lg: 'px-4 py-2 text-base',
  xl: 'px-6 py-3 text-base',
};

const colors: Record<ButtonVariant, string> = {
  primary:
    'text-neutral-50 dark:text-neutralDark-900 bg-primary-400 dark:bg-primaryDark-400 hover:bg-primary-500 dark:hover:bg-primary-500 focus:ring-primary-400 dark:focus:ring-primaryDark-400',
};

const disabledClasses =
  'cursor-not-allowed bg-neutral-300 dark:bg-neutralDark-300 hover:bg-neutral-300 dark:hover:bg-neutralDark-300';

export const classes = (
  size: ButtonSize,
  variant: ButtonVariant,
  disabled?: boolean,
) => cn(baseClasses, sizes[size], colors[variant], disabled && disabledClasses);
