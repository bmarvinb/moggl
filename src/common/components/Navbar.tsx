import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { FC } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';

export type NavbarProps = {
  onMenuClicked: () => void;
};

export const Navbar: FC<NavbarProps> = props => {
  return (
    <Box
      as="nav"
      css={{
        background: '$navBg',
        color: '$neutral1',
        minHeight: '2.75rem',
      }}
    >
      <Button
        variant="icon"
        color="transparent"
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
        onClick={() => props.onMenuClicked()}
      >
        <BiMenuAltLeft />
      </Button>
    </Box>
  );
};
