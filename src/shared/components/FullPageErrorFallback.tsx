import { FC } from 'react';

export const FullPageErrorFallback: FC<{ error: unknown }> = props => {
  console.error('Error', props.error);

  return (
    <div
      className="flex flex-col items-center justify-center bg-neutral-100 text-neutral-500 dark:bg-neutral-800 dark:text-neutral-200"
      role="alert"
    >
      <p>There&apos;s a problem. Try refreshing the app.</p>
    </div>
  );
};
