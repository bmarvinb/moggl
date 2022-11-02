import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { BiX } from 'react-icons/bi';
import { styled } from '@stitches/react';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 20,
});

const StyledContent = styled(DialogPrimitive.Content, {
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 300,
  maxHeight: '85vh',
  padding: '$8',
  marginTop: '-5vh',
  borderRadius: '$lg',
  boxShadow: '$md',
  willChange: 'transform',
  '&:focus': {
    outline: 'none',
  },
  zIndex: 30,
});

const StyledCloseButton = styled(DialogPrimitive.Close, {
  position: 'absolute',
  top: '$2',
  right: '$2',
});

type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>;
type DialogContentProps = DialogContentPrimitiveProps;

const DialogContent = (props: DialogContentProps) => (
  <DialogPrimitive.Portal>
    <StyledOverlay className="bg-black/50" />
    <StyledContent className="bg-neutral-50 dark:bg-neutral-dark-200">
      {props.children}
      <StyledCloseButton asChild>
        <button className="text-neutral-50 dark:text-neutral-dark-900">
          <BiX />
        </button>
      </StyledCloseButton>
    </StyledContent>
  </DialogPrimitive.Portal>
);

const DialogClose = DialogPrimitive.Close;
const DialogTitle = DialogPrimitive.Title;
const DialogDescription = DialogPrimitive.Description;

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
  DialogTitle,
  DialogDescription,
};
