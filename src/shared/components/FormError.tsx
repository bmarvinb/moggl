import React from 'react';

export type FormErrorProps = {
  children?: React.ReactNode;
  className?: string;
};

export const FormError = (props: FormErrorProps) => (
  <div className={`text-sm text-red-500 ${props.className}`}>
    {props.children}
  </div>
);
