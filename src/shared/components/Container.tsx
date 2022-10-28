import React from 'react';

export type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Container = (props: ContainerProps) => (
  <div
    className={`flex flex-1 flex-col bg-neutral-100 dark:bg-neutral-700 ${props.className}`}
  >
    {props.children}
  </div>
);
