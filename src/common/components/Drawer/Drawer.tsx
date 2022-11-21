import React, { Fragment } from 'react';
import { BiMenuAltLeft } from 'react-icons/bi';
import { assertNever } from 'common/utils/assert';
import { Dialog, Transition } from '@headlessui/react';
import { ButtonIcon } from '../Elements/ButtonIcon';

export type DrawerProps = {
  children: React.ReactNode;
  open: boolean;
  variant: 'temporary' | 'permanent';
  onOpenChange: () => void;
};

const TemporaryDrawer = (props: Omit<DrawerProps, 'variant'>) => {
  return (
    <Transition appear show={props.open} as={Fragment}>
      <Dialog as="div" className="z-10" onClose={() => props.onOpenChange()}>
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
                {props.children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

const PermanentDrawer = (props: Omit<DrawerProps, 'variant'>) => {
  return (
    <div
      className={`relative z-20 flex h-full flex-col overflow-hidden bg-primary-400 shadow-inner duration-200 ease-in-out dark:bg-primary-dark-400 ${
        props.open ? 'w-56' : 'w-16'
      }`}
    >
      <div className="px-5 py-3">
        <ButtonIcon
          className="relative -left-0.5 text-neutral-50"
          icon={<BiMenuAltLeft />}
          variant="ghost"
          size="lg"
          title={props.open ? 'Close sidebar' : 'Open sidebar'}
          onClick={props.onOpenChange}
        ></ButtonIcon>
      </div>
      {props.children}
    </div>
  );
};

export const Drawer = (props: DrawerProps) => {
  switch (props.variant) {
    case 'temporary':
      return (
        <TemporaryDrawer open={props.open} onOpenChange={props.onOpenChange}>
          {props.children}
        </TemporaryDrawer>
      );
    case 'permanent':
      return (
        <PermanentDrawer open={props.open} onOpenChange={props.onOpenChange}>
          {props.children}
        </PermanentDrawer>
      );
    default:
      return assertNever(props.variant);
  }
};
