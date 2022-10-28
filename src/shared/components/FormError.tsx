import React from 'react';
import { styled } from 'theme/config';

export type FormErrorProps = {
  children?: React.ReactNode;
  classNames?: string;
};

export const FormError = (props: FormErrorProps) => (
  <div className="text-sm text-red-500">{props.children}</div>
);
