import React from 'react';

export function useDialog(opened = false) {
  const [isOpen, setDialogOpen] = React.useState(false);

  const open = () => setDialogOpen(true);

  const close = () => setDialogOpen(false);

  return [isOpen, { open, close }] as const;
}
