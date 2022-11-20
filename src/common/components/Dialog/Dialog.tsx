import { Dialog as HeadlessDialog, Transition } from '@headlessui/react';
import React, { Fragment } from 'react';
import { BiX } from 'react-icons/bi';
import { ButtonIcon } from '../Elements/ButtonIcon';

export type DialogProps = {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
};

export function Dialog(props: DialogProps) {
  return (
    <DialogContainer isOpen={props.isOpen} onClose={props.onClose}>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle title={props.title} onClose={props.onClose} />
        {props.children}
      </DialogContent>
    </DialogContainer>
  );
}

function DialogContent({ children }: { children: React.ReactNode }) {
  return (
    <div className="fixed inset-0 overflow-y-auto">
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
            {children}
          </HeadlessDialog.Panel>
        </Transition.Child>
      </div>
    </div>
  );
}

function DialogOverlay() {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="fixed inset-0 bg-black/60 dark:bg-black/80" />
    </Transition.Child>
  );
}

function DialogContainer({
  children,
  isOpen,
  onClose,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <HeadlessDialog as="div" className="relative z-20" onClose={onClose}>
        {children}
      </HeadlessDialog>
    </Transition>
  );
}

function DialogTitle({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <HeadlessDialog.Title
      as="h3"
      className="align-center mb-4 flex items-center justify-between text-lg font-semibold leading-6 text-neutral-800 dark:text-neutral-dark-800"
    >
      {title}
      <ButtonIcon
        onClick={onClose}
        className="-mr-2"
        size="2xl"
        icon={<BiX />}
      ></ButtonIcon>
    </HeadlessDialog.Title>
  );
}
