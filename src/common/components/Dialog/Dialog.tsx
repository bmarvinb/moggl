import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';

export type DialogProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export const Dialog = (props: DialogProps) => {
  return (
    <Transition appear show={props.isOpen} as={Fragment}>
      <HeadlessDialog
        as="div"
        className="relative z-20"
        onClose={props.onClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25 dark:bg-opacity-50" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto ">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <HeadlessDialog.Panel className="w-full max-w-md transform rounded-2xl bg-neutral-50 p-6 text-left align-middle shadow-xl transition-all dark:bg-neutral-dark-50">
                <HeadlessDialog.Title
                  as="h3"
                  className="mb-2 text-lg font-semibold leading-6 text-neutral-800 dark:text-neutral-dark-800"
                >
                  {props.title}
                </HeadlessDialog.Title>
                {props.children}
              </HeadlessDialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </HeadlessDialog>
    </Transition>
  );
};
