import * as DialogPrimitive from '@radix-ui/react-dialog';
import React, { FC } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { Button } from 'shared/components/Button';
import { assertNever } from 'shared/utils/assert';

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>;
type DrawerContentProps = DialogContentPrimitiveProps;

const DrawerContent = (props: DrawerContentProps) => (
  <DialogPrimitive.Portal>
    <DialogPrimitive.Overlay className="fixed top-0 left-0 bottom-0 right-0 z-10 bg-black/75" />
    <DialogPrimitive.Content className="fixed top-0 left-0 bottom-0 z-20 flex w-56 bg-blue-500 duration-200">
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
          className={`relative z-20 flex h-full flex-col overflow-hidden bg-blue-500 shadow-inner duration-200 ease-in ease-out ${
            props.open ? 'w-56' : 'w-16'
          }`}
        >
          <div className="px-4 py-3">
            <Button
              onClick={props.onOpenChange}
              variant="icon"
              size="lg"
              css={{
                color: '$lightTextColor',
                '&:hover': {
                  color: '$lightTextColor',
                },
              }}
              title="Open sidebar"
            >
              <BiMenuAltLeft />
            </Button>
          </div>
          {props.children}
        </div>
      );
    default:
      return assertNever(props.variant);
  }
};
