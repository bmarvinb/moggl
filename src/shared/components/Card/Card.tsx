import React from 'react';
import { clsx } from 'clsx';

export type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Card = (props: CardProps) => (
  <div
    className={clsx(
      'rounded-lg bg-neutral-50 shadow-sm dark:bg-neutral-dark-50',
      props.className,
    )}
  >
    {props.children}
  </div>
);
