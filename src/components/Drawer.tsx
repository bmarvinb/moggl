import * as DialogPrimitive from '@radix-ui/react-dialog'
import { VariantProps } from '@stitches/react'
import { Box } from 'components/Box'
import { Button } from 'components/Button'
import React, { FC } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { styled } from 'theme/config'
import { fadeIn, fadeOut, slideIn, slideOut } from 'utils/animations'
import { assertNever } from 'utils/function'

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$blackA10',
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  zIndex: 1,
  '&[data-state="open"]': {
    animation: `${fadeIn} 300ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${fadeOut} 300ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
})

const StyledContent = styled(DialogPrimitive.Content, {
  $$transformValue: 'translate3d(-100%,0,0)',
  backgroundColor: '$neutral1',
  width: '15rem',
  zIndex: 2,
  padding: '$8',
  left: 0,
  position: 'fixed',
  top: 0,
  bottom: 0,
  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
})

const StyledPermanentContent = styled('div', {
  $$transformValue: 'translate3d(-100%,0,0)',
  backgroundColor: '$navBg',
  zIndex: 2,
  boxShadow: '$md',
  padding: '$8',
  transition: 'width 300ms cubic-bezier(0.22, 1, 0.36, 1)',
  position: 'relative',
  height: '100%',
  variants: {
    variant: {
      collapsed: {
        width: '4rem',
      },
      expanded: {
        width: '15rem',
      },
    },
  },
})

type DrawerContentVariants = VariantProps<typeof StyledContent>
type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>
type DrawerContentProps = DialogContentPrimitiveProps & DrawerContentVariants

const DrawerContent = (props: DrawerContentProps) => (
  <DialogPrimitive.Portal>
    <StyledOverlay />
    <StyledContent>{props.children}</StyledContent>
  </DialogPrimitive.Portal>
)

export type DrawerProps = {
  children?: React.ReactNode
  open: boolean
  variant: 'temporary' | 'permanent'
  onOpenChange: () => void
}

export const Drawer: FC<DrawerProps> = props => {
  switch (props.variant) {
    case 'temporary':
      return (
        <DialogPrimitive.Root
          open={props.open}
          onOpenChange={props.onOpenChange}
        >
          <DrawerContent>{props.children}</DrawerContent>
        </DialogPrimitive.Root>
      )
    case 'permanent':
      return (
        <StyledPermanentContent variant={props.open ? 'expanded' : 'collapsed'}>
          <Box>
            <Button
              onClick={props.onOpenChange}
              variant="icon"
              size="lg"
              css={{
                position: 'absolute',
                top: '0.25rem',
                left: '0.75rem',
                color: '$lightTextColor',
                '&:hover': {
                  color: '$lightTextColor',
                },
              }}
              title="Open menu"
            >
              <BiMenuAltLeft />
            </Button>
            {props.children}
          </Box>
        </StyledPermanentContent>
      )
    default:
      return assertNever(props.variant)
  }
}
