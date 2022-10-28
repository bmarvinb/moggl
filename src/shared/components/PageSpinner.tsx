import { Spinner } from 'shared/components/Spinner';

export const PageSpinner = () => (
  <div className="flex h-full items-center justify-center bg-slate-200 text-4xl dark:bg-slate-700">
    <Spinner />
  </div>
);
