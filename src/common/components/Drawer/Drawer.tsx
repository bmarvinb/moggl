import React, { Fragment } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { Dialog, Transition } from '@headlessui/react';
import { ButtonIcon } from '../Elements/ButtonIcon';
import { DrawerType } from './useDrawer';
import clsx from 'clsx';

type DrawerProps = {
  open: boolean;
  type: DrawerType;
  children: React.ReactNode;
  onOpenChange: () => void;
};

type ConcreteDrawerProps = Omit<DrawerProps, 'type'>;

const TemporaryDrawer = ({
  open,
  children,
  onOpenChange,
}: ConcreteDrawerProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as="div" className="z-10" onClose={onOpenChange}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="inset fixed top-0 ">
          <div className="flex h-screen items-center justify-center  text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-200"
              enterFrom="opacity-0 -translate-x-8"
              enterTo="opacity-100 translate-x-0"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-x-0"
              leaveTo="opacity-0 -translate-x-8"
            >
              <Dialog.Panel className="flex h-full transform flex-col overflow-hidden bg-primary-400 text-left align-middle shadow-xl transition-all dark:bg-primary-dark-400">
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const PermanentDrawer = ({
  open,
  children,
  onOpenChange,
}: ConcreteDrawerProps) => {
  return (
    <div
      className={clsx(
        'relative z-20 flex h-full flex-col overflow-hidden bg-primary-400 shadow-inner duration-200 ease-in-out dark:bg-primary-dark-400',
        open ? 'w-56' : 'w-16',
      )}
    >
      <div className="px-5 py-3">
        <ButtonIcon
          className="relative -left-0.5 text-neutral-50"
          icon={<BiMenuAltLeft />}
          variant="ghost"
          size="lg"
          title={open ? 'Close sidebar' : 'Open sidebar'}
          onClick={onOpenChange}
        ></ButtonIcon>
      </div>
      {children}
    </div>
  );
};

const drawers = {
  permanent: PermanentDrawer,
  temporary: TemporaryDrawer,
};

export const Drawer = ({ type, open, children, onOpenChange }: DrawerProps) => {
  const ConcreteDrawer = drawers[type];
  return (
    <ConcreteDrawer open={open} onOpenChange={onOpenChange}>
      {children}
    </ConcreteDrawer>
  );
};
