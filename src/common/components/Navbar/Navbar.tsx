import { BiMenuAltLeft } from 'react-icons/bi';
import { ButtonIcon } from '../Elements/ButtonIcon';

export type NavbarProps = {
  onMenuClicked: () => void;
};

export const Navbar = (props: NavbarProps) => {
  return (
    <nav className="items-center bg-primary-400 px-4 py-4 leading-3 text-neutral-100 dark:bg-primary-dark-400">
      <ButtonIcon
        icon={<BiMenuAltLeft />}
        variant="ghost"
        size="lg"
        title="Open sidebar"
        onClick={props.onMenuClicked}
      ></ButtonIcon>
    </nav>
  );
};
