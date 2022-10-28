import { Spinner } from 'shared/components/Spinner';

export const PageSpinner = () => (
  <div className="flex h-full items-center justify-center bg-neutral-100 text-4xl dark:bg-neutral-700">
    <Spinner />
  </div>
);
