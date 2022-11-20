import React from 'react';
import { clsx } from 'clsx';

type CardProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Card = ({ children, className }: CardProps) => (
  <div
    className={clsx(
      'rounded-lg bg-neutral-50 shadow-sm dark:bg-neutral-dark-50',
      className,
    )}
  >
    {children}
  </div>
);
