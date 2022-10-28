import React from 'react';

export type LabelProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Label = (props: LabelProps) => (
  <label className="mb-2 block text-sm font-bold text-slate-900 dark:text-slate-50">
    {props.children}
  </label>
);
