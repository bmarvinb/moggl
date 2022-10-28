import { Spinner } from './Spinner';

export const FullPageSpinner = () => {
  return (
    <div className="flex flex-col justify-center bg-slate-100 align-middle dark:bg-slate-800">
      <Spinner />
    </div>
  );
};
