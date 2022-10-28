import React from 'react';
import { styled } from 'theme/config';

export type TitleProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Title = (props: TitleProps) => (
  <h1 className={`m-0 p-0 text-xl font-bold ${props.className}`}>
    {props.children}
  </h1>
);
