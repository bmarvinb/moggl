import { FC, InputHTMLAttributes } from 'react';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: FC<CheckboxProps> = props => (
  <input {...props} type="checkbox" />
);
