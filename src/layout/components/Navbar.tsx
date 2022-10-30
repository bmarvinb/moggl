import { FC } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';

export type NavbarProps = {
  onMenuClicked: () => void;
};

export const Navbar = (props: NavbarProps) => {
  return (
    <nav className="leading-3 bg-primary-500 dark:bg-primaryDark-500 px-4 py-4 text-neutral-100 items-center">
      <button title="Open sidebar" onClick={props.onMenuClicked}>
        <BiMenuAltLeft />
      </button>
    </nav>
  );
};
