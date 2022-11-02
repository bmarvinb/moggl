import React from 'react';
import { cn } from 'theme/utils';

export type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Card = (props: CardProps) => (
  <div
    className={cn(
      'rounded-lg bg-neutral-50 shadow-sm dark:bg-neutral-dark-50',
      props.className,
    )}
  >
    {props.children}
  </div>
);
