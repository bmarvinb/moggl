import { BiMenuAltLeft } from 'react-icons/bi';

export type NavbarProps = {
  onMenuClicked: () => void;
};

export const Navbar = (props: NavbarProps) => {
  return (
    <nav className="items-center bg-primary-400 px-4 py-4 leading-3 text-neutral-100 dark:bg-primary-dark-400">
      <button title="Open sidebar" onClick={props.onMenuClicked}>
        <BiMenuAltLeft />
      </button>
    </nav>
  );
};
