import { FC } from 'react';

export const FullPageErrorFallback: FC<{ error: unknown }> = props => {
  console.error('Error', props.error);

  return (
    <div
      className="flex flex-col justify-center bg-slate-100 items-center text-slate-500 dark:bg-slate-800 dark:text-slate-200"
      role="alert"
    >
      <p>There&apos;s a problem. Try refreshing the app.</p>
    </div>
  );
};
