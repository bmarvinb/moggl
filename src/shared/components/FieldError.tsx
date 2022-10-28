import React from 'react';

export type FieldErrorProps = {
  children?: React.ReactNode;
  className?: string;
};

export const FieldError = (props: FieldErrorProps) => (
  <p className={`my-2 mx-0 block text-sm text-red-400 ${props.className}`}>
    {props?.children}
  </p>
);
