import { clsx } from 'clsx';

export type FieldMessageVariant = 'critical' | 'positive' | 'neutral';

export type FieldMessageProps = {
  id: string;
  message: string;
  variant?: FieldMessageVariant;
};

const variants: Record<FieldMessageVariant, string> = {
  critical: 'text-red-400 dark:text-red-dark-400',
  positive: 'text-cyan-400 dark:text-cyan-dark-400',
  neutral: 'text-neutral-800 dark:text-neutral-dark-800',
};

export const FieldMessage = ({
  message,
  variant = 'neutral',
}: FieldMessageProps) => {
  return (
    <div
      className={clsx(
        'flex items-center gap-1 pt-1 text-sm',
        variants[variant],
      )}
    >
      {message}
    </div>
  );
};
