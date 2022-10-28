import React from 'react';

export type FormFieldProps = {
  children?: React.ReactNode;
};

export const FormField = (props: FormFieldProps) => (
  <div className="mb-6">{props.children}</div>
);
