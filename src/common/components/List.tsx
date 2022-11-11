import React from 'react';
import { Card } from 'common/components/Card/Card';

export type ListProps = {
  className?: string;
  children?: React.ReactNode;
};

export const List = (props: ListProps) => (
  <Card className="flex flex-col">{props?.children}</Card>
);

export type ListItemProps = {
  className?: string;
  children?: React.ReactNode;
};

export const ListItem = (props: ListItemProps) => (
  <div
    className={`border-b border-neutral-100 py-6 px-8 last:border-b-0 dark:border-neutral-800 ${props.className}`}
  >
    {props?.children}
  </div>
);
