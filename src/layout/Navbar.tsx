import { Button } from 'shared/components/Button';
import { FC } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';

export type NavbarProps = {
  onMenuClicked: () => void;
};

export const Navbar: FC<NavbarProps> = props => {
  return (
    <nav className="bg-blue-500 px-6 py-3 text-slate-100">
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
    </nav>
  );
};
