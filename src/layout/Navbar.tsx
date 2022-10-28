import { FC } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';

export type NavbarProps = {
  onMenuClicked: () => void;
};

export const Navbar: FC<NavbarProps> = props => {
  return (
    <nav className="bg-primary-500 dark:bg-primaryDark-500 px-3 py-1.5 text-neutral-100">
      <button title="Open sidebar" onClick={() => props.onMenuClicked()}>
        <BiMenuAltLeft />
      </button>
    </nav>
  );
};
