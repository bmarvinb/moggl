import * as DialogPrimitive from '@radix-ui/react-dialog';
import React from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { assertNever } from 'shared/utils/assert';

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>;
type DrawerContentProps = DialogContentPrimitiveProps;

const DrawerContent = (props: DrawerContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black/50" />
    <DialogPrimitive.Content className="ease-in-out duration-200 fixed top-0 left-0 bottom-0 z-20 flex bg-primary-400  dark:bg-primaryDark-400">
      {props.children}
    </DialogPrimitive.Content>
  </DialogPrimitive.Portal>
);

export type DrawerProps = {
  children?: React.ReactNode;
  open: boolean;
  variant: 'temporary' | 'permanent';
  onOpenChange: () => void;
};

export const Drawer = (props: DrawerProps) => {
  switch (props.variant) {
    case 'temporary':
      return (
        <DialogPrimitive.Root
          open={props.open}
          onOpenChange={props.onOpenChange}
        >
          <DrawerContent>
            <div className="flex w-full flex-col">{props.children}</div>
          </DrawerContent>
        </DialogPrimitive.Root>
      );
    case 'permanent':
      return (
        <div
          className={`relative z-20 flex h-full flex-col overflow-hidden bg-primary-400 shadow-inner duration-200 ease-in-out dark:bg-primaryDark-400 ${
            props.open ? 'w-56' : 'w-16'
          }`}
        >
          <div className="px-4 py-3">
            <button
              className={`p-2 flex items-center text-neutral-50 dark:text-neutralDark-900`}
              onClick={props.onOpenChange}
              title="Open sidebar"
            >
              <BiMenuAltLeft className="relative" />
            </button>
          </div>
          {props.children}
        </div>
      );
    default:
      return assertNever(props.variant);
  }
};
