import React from 'react';
import { NavLink } from 'react-router-dom';
import { cn } from 'theme/utils';

export type NavigationMenuItem = {
  route: string;
  title: string;
  icon: React.ReactNode;
};

export type NavigationMenuProps = {
  open: boolean;
  items: NavigationMenuItem[];
  onMenuItemClicked: () => void;
};

export const NavigationMenu = ({
  items,
  open,
  onMenuItemClicked,
}: NavigationMenuProps) => (
  <nav className="flex flex-1 flex-col justify-between overflow-y-scroll text-neutral-900 dark:text-neutral-50">
    <ul className="py-1 px-1.5">
      {items.map(item => (
        <li
          className="flex mb-1 items-center overflow-x-hidden"
          key={item.route}
        >
          <NavLink
            to={item.route}
            className={({ isActive }) =>
              cn(
                'rounded flex w-full items-center gap-3 py-3 px-4 text-neutral-50 no-underline hover:cursor-pointer hover:bg-primary-300 active:hover:cursor-default',
                isActive &&
                  'bg-primary-500 hover:bg-primary-500 hover:cursor-default',
              )
            }
            onClick={() => onMenuItemClicked()}
          >
            <div className={cn('relative flex text-xl text-neutral-100')}>
              {item.icon}
            </div>
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
