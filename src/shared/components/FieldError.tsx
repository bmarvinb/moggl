import React from 'react';
import { styled } from 'theme/config';

export type FieldErrorProps = {
  children?: React.ReactNode;
  classNames?: string;
};

export const FieldError = (props: FieldErrorProps) => (
  <p className="my-2 mx-0 block text-sm text-red-400">{props?.children}</p>
);
