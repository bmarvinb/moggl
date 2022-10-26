import * as DialogPrimitive from '@radix-ui/react-dialog';
import { VariantProps } from '@stitches/react';
import { Box } from 'shared/components/Box';
import { Button } from 'shared/components/Button';
import React, { FC } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { styled } from 'theme/config';
import { slideIn, slideOut } from 'shared/animations/slide';
import { fadeIn, fadeOut } from 'shared/animations/fade';
import { assertNever } from 'shared/utils/assert';

const StyledOverlay = styled(DialogPrimitive.Overlay, {
  backgroundColor: '$overlay',
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
});

const StyledContent = styled(DialogPrimitive.Content, {
  $$transformValue: 'translate3d(-100%,0,0)',
  backgroundColor: '$navBg',
  width: '15rem',
  zIndex: 2,
  left: 0,
  position: 'fixed',
  top: 0,
  display: 'flex',
  bottom: 0,
  '&[data-state="open"]': {
    animation: `${slideIn} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
  '&[data-state="closed"]': {
    animation: `${slideOut} 150ms cubic-bezier(0.22, 1, 0.36, 1)`,
  },
});

const StyledPermanentContent = styled('div', {
  $$transformValue: 'translate3d(-100%,0,0)',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '$navBg',
  zIndex: 2,
  boxShadow: '$inner',
  transition: 'width 300ms cubic-bezier(0.22, 1, 0.36, 1)',
  position: 'relative',
  height: '100%',
  overflow: 'hidden',
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
});

type DrawerContentVariants = VariantProps<typeof StyledContent>;
type DialogContentPrimitiveProps = React.ComponentProps<
  typeof DialogPrimitive.Content
>;
type DrawerContentProps = DialogContentPrimitiveProps & DrawerContentVariants;

const DrawerContent = (props: DrawerContentProps) => (
  <DialogPrimitive.Portal>
    <StyledOverlay />
    <StyledContent>{props.children}</StyledContent>
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
            <Box
              css={{
                display: 'flex',
                flexDirection: 'column',
                width: '100%',
              }}
            >
              {props.children}
            </Box>
          </DrawerContent>
        </DialogPrimitive.Root>
      );
    case 'permanent':
      return (
        <StyledPermanentContent variant={props.open ? 'expanded' : 'collapsed'}>
          <Box css={{ padding: '$4 $7' }}>
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
          </Box>
          {props.children}
        </StyledPermanentContent>
      );
    default:
      return assertNever(props.variant);
  }
};
