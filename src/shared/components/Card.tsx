import React from 'react';

export type CardProps = {
  className?: string;
  children?: React.ReactNode;
};

export const Card = (props: CardProps) => (
  <div
    className={`rounded bg-slate-50 shadow-md dark:bg-slate-900 ${props.className}`}
  >
    {props.children}
  </div>
);
