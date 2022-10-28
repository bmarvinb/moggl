import React from 'react';

export type CardProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Card = (props: CardProps) => (
  <div
    className={`rounded-lg bg-neutral-50 shadow-md dark:bg-neutralDark-50 ${props.className}`}
  >
    {props.children}
  </div>
);
