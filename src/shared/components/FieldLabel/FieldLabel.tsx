import { cn } from 'theme/utils';

export type FieldLabelProps = {
  label: string;
  htmlFor: string;
  secondaryLabel?: string;
  disabled?: boolean;
  description?: string;
};

export const FieldLabel = ({
  label,
  htmlFor,
  secondaryLabel,
  disabled,
  description,
}: FieldLabelProps) => {
  return (
    <div>
      <label
        className={cn(
          'font-semibold text-sm',
          disabled
            ? 'text-neutral-600 dark:text-neutralDark-600'
            : 'text-neutral-800 dark:text-neutralDark-800',
        )}
        htmlFor={htmlFor}
      >
        {label}
        {secondaryLabel ? (
          <span className="text-neutral-500 dark:text-neutralDark-500">
            {secondaryLabel}
          </span>
        ) : (
          ''
        )}
      </label>
      {description && <span>{description}</span>}
    </div>
  );
};
