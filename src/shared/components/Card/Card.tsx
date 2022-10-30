import React from 'react';
import { DefaultProps } from 'theme/types';
import { cn } from 'theme/utils';

export type CardProps = DefaultProps & {
  children?: React.ReactNode;
};

export const Card = (props: CardProps) => (
  <div
    className={cn(
      'rounded-lg bg-neutral-50 shadow-sm dark:bg-neutralDark-50',
      props.className,
    )}
  >
    {props.children}
  </div>
);
