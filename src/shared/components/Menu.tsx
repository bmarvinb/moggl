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
  <nav className="flex flex-1 flex-col justify-between overflow-y-scroll text-slate-900 dark:text-slate-50">
    <ul>
      {items.map(item => (
        <li className="flex items-center overflow-x-hidden" key={item.route}>
          <NavLink
            to={item.route}
            className={({ isActive }) =>
              `flex w-full items-center gap-6 py-4 px-5 text-slate-50 no-underline hover:cursor-pointer hover:bg-blue-400 active:bg-blue-500 active:hover:cursor-default ${
                isActive ? 'bg-blue-600 hover:bg-blue-600' : undefined
              }`
            }
            onClick={() => onMenuItemClicked()}
          >
            <div className="flex text-xl">{item.icon}</div>
            <div
              className="data-[state=open]:opacity-100 data-[state=closed]:opacity-0"
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