import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps } from '@stitches/react'
import React from 'react'
import { styled } from 'theme/config'
import { fadeIn, fadeOut, slideIn, slideOut } from 'utils/animations'

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$blackA10',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  '&[data-state="open"]': {
    animation: `${fadeIn} 300ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${fadeOut} 300ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
})

const StyledContent = styled(DialogPrimitive.Content, {
  backgroundColor: '$neutral1',
  position: 'fixed',
  top: 0,
  bottom: 0,
  width: '15rem',
  zIndex: 1,
  padding: '$8',
  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
  variants: {
    side: {
      left: {
        $$transformValue: 'translate3d(-100%,0,0)',
        left: 0,
      },
    },
  },
  defaultVariants: {
    side: 'left',
  },
})

type DrawerContentVariants = VariantProps<typeof StyledContent>
type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>
type DrawerContentProps = DialogContentPrimitiveProps & DrawerContentVariants

const DrawerContent = (props: DrawerContentProps) => {
  return (
    <DialogPrimitive.Portal>
      <StyledOverlay />
      <StyledContent>{props.children}</StyledContent>
    </DialogPrimitive.Portal>
  )
}

const Drawer = DialogPrimitive.Root
const DrawerTrigger = DialogPrimitive.Trigger
const DrawerClose = DialogPrimitive.Close

export { Drawer, DrawerTrigger, DrawerContent, DrawerClose }
