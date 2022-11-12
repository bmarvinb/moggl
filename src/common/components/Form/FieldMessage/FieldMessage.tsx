import { clsx } from 'clsx';

export type FieldMessageVariant = 'error' | 'success' | 'neutral';

export type FieldMessageData = {
  message: string;
  variant: FieldMessageVariant;
};

export type FieldMessageProps = {
  data: FieldMessageData;
};

const variants: Record<FieldMessageVariant, string> = {
  error: 'text-red-400 dark:text-red-dark-500',
  success: 'text-cyan-400 dark:text-cyan-dark-500',
  neutral: 'text-neutral-800 dark:text-neutral-dark-800',
};

export const FieldMessage = ({ data }: FieldMessageProps) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-1 pt-1 text-sm',
        variants[data.variant],
      )}
    >
      {data.message}
    </div>
  );
};
