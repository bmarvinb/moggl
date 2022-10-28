import React from 'react';
import { styled } from 'theme/config';

export type ContainerProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Container = (props: ContainerProps) => (
  <div
    className={`flex flex-1 flex-col bg-slate-200 dark:bg-slate-700 ${props.className}`}
  >
    {props.children}
  </div>
);
