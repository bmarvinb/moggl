import { Spinner } from './Spinner';

export const FullPageSpinner = () => {
  return (
    <div className="flex flex-col justify-center bg-neutral-100 align-middle dark:bg-neutral-800">
      <Spinner />
    </div>
  );
};
