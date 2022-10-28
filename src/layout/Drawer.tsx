import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { FC } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { assertNever } from 'shared/utils/assert';

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>;
type DrawerContentProps = DialogContentPrimitiveProps;

const DrawerContent = (props: DrawerContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black/75" />
    <DialogPrimitive.Content className="fixed top-0 left-0 bottom-0 z-20 flex w-56 bg-primary-500 duration-200 dark:bg-primaryDark-500">
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

export const Drawer: FC<DrawerProps> = props => {
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
          className={`relative z-20 flex h-full flex-col overflow-hidden bg-primary-500 shadow-inner duration-200 ease-in-out dark:bg-primaryDark-500 ${
            props.open ? 'w-56' : 'w-16'
          }`}
        >
          <div className="px-4 py-3">
            <button onClick={props.onOpenChange} title="Open sidebar">
              <BiMenuAltLeft />
            </button>
          </div>
          {props.children}
        </div>
      );
    default:
      return assertNever(props.variant);
  }
};
