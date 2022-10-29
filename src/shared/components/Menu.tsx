import { NavLink } from 'react-router-dom';

export type MenuItem = {
  route: string;
  title: string;
  icon: JSX.Element;
};

export type MenuProps = {
  open: boolean;
  items: MenuItem[];
  onMenuItemClicked: () => void;
};

export const Menu = ({ items, open, onMenuItemClicked }: MenuProps) => (
  <nav className="flex flex-1 flex-col justify-between overflow-y-scroll text-neutral-900 dark:text-neutral-50">
    <ul>
      {items.map(item => (
        <li className="flex items-center overflow-x-hidden" key={item.route}>
          <NavLink
            to={item.route}
            className={({ isActive }) =>
              `flex w-full items-center gap-6 py-4 px-5 focus-visible:outline focus-visible:outline-1 focus-visible:-outline-offset-1 focus-visible:outline-primary-400 text-neutral-50 no-underline hover:cursor-pointer hover:bg-primary-300 active:hover:cursor-default ${
                isActive ? 'bg-primary-500 hover:bg-primary-500' : undefined
              }`
            }
            onClick={() => onMenuItemClicked()}
          >
            <div className="left-0.5 relative flex text-xl">{item.icon}</div>
            <div
              className="duration-200 data-[state=open]:opacity-100 data-[state=closed]:opacity-0"
              data-state={open ? 'open' : 'closed'}
            >
              {item.title}
            </div>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);
