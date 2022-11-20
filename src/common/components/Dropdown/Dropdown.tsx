import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import clsx from 'clsx';
import React, { Fragment } from 'react';

export function Trigger({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HeadlessMenu.Button className={clsx('flex items-center', className)}>
      {children}
    </HeadlessMenu.Button>
  );
}

export function Menu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <HeadlessMenu
      as="div"
      className={clsx('relative m-auto inline-block text-left', className)}
    >
      {children}
    </HeadlessMenu>
  );
}

export function MenuItems({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <HeadlessMenu.Items
        className={clsx(
          'absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-neutral-50 p-1 shadow-md ring-1 ring-black ring-opacity-5 focus:outline-none dark:divide-neutral-dark-100 dark:bg-neutral-dark-50',
          className,
        )}
      >
        {children}
      </HeadlessMenu.Items>
    </Transition>
  );
}

export function MenuItem({
  children,
  disabled,
  className,
  onClick,
}: {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <HeadlessMenu.Item>
      {({ active }) => (
        <button
          onClick={onClick}
          className={clsx(
            `${
              active
                ? 'bg-primary-400 text-neutral-50 dark:bg-primary-dark-400'
                : 'text-neutral-900 dark:text-neutral-dark-900'
            } group flex w-full items-center rounded-md px-2 py-2 text-sm`,
            className,
          )}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </HeadlessMenu.Item>
  );
}
