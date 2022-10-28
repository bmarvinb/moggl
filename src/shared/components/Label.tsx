import React from 'react';

export type LabelProps = {
  children?: React.ReactNode;
  className?: string;
};

export const Label = (props: LabelProps) => (
  <label className="mb-2 block text-sm font-bold text-neutral-900 dark:text-neutral-50">
    {props.children}
  </label>
);
