import { Spinner } from 'common/components/Elements/Spinner/Spinner';

export const PageSpinner = () => (
  <div className="flex h-full items-center justify-center bg-neutral-100 text-4xl dark:bg-neutral-700">
    <Spinner
      className="text-neutral-400 dark:text-neutral-dark-400"
      size="lg"
    />
  </div>
);
