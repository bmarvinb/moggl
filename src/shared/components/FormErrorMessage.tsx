import React from 'react';

export type FormErrorMessageProps = { children?: React.ReactNode };

export const FormErrorMessage = (props: FormErrorMessageProps) => (
  <div className="text-red-400"></div>
);
