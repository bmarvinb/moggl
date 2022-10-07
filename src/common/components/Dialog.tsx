import React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { styled } from 'core/theme/config';
import { Button } from 'common/components/Button';
import { BiX } from 'react-icons/bi';

const Dialog = DialogPrimitive.Root;
const DialogTrigger = DialogPrimitive.Trigger;

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$overlay',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
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
  backgroundColor: '$neutral1',
  borderRadius: '$lg',
  boxShadow: '$md',
  willChange: 'transform',
  '&:focus': {
    outline: 'none',
  },
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
    <StyledOverlay />
    <StyledContent>
      {props.children}
      <StyledCloseButton asChild>
        <Button color="transparent" variant="icon" size="lg">
          <BiX />
        </Button>
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
