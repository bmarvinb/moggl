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
        padding: '$4 $7',
      }}
    >
      <Button
        variant="icon"
        color="transparent"
        size="lg"
        css={{
          color: '$lightTextColor',
          '&:hover': {
            color: '$lightTextColor',
          },
        }}
        title="Open sidebar"
        onClick={() => props.onMenuClicked()}
      >
        <BiMenuAltLeft />
      </Button>
    </Box>
  );
};
