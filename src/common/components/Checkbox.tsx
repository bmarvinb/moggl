import { InputHTMLAttributes } from 'react';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = (props: CheckboxProps) => (
  <input {...props} type="checkbox" />
);
