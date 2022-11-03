import { Spinner } from './Spinner/Spinner';

export const FullPageSpinner = () => {
  return (
    <div className="flex flex-col justify-center bg-neutral-100 align-middle dark:bg-neutral-dark-100">
      <Spinner />
    </div>
  );
};
