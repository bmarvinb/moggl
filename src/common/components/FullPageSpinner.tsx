import { Transition } from '@headlessui/react';
import { Spinner } from './Elements/Spinner/Spinner';

export const FullPageSpinner = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-neutral-100 dark:bg-neutral-dark-100">
      <Spinner
        size="xl"
        className="dark:text-primary-neutral-400 text-neutral-400"
      />
    </div>
  );
};
