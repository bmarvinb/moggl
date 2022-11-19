import clsx from 'clsx';
import { InputHTMLAttributes } from 'react';
import { FieldMessage, FieldMessageData } from './Form/FieldMessage';

export type CheckboxProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  description?: string;
  fieldMessage?: FieldMessageData;
  className?: string;
};

export const Checkbox = ({
  label,
  description,
  fieldMessage,
  className,
  checked,
  id,
  ...rest
}: CheckboxProps) => (
  <>
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        className={clsx(
          'h-4 w-4 rounded border-neutral-300 bg-neutral-100 text-primary-400 ring-neutral-50 hover:cursor-pointer focus:ring-2 focus:ring-primary-300 focus:ring-offset-0 dark:border-neutral-dark-300 dark:bg-neutral-dark-50 dark:text-primary-dark-400 dark:ring-neutral-dark-50 dark:focus:ring-primary-dark-300',
          className,
        )}
        {...rest}
      />
      <label
        className="pl-3 text-neutral-900 hover:cursor-pointer dark:text-neutral-dark-900"
        htmlFor={id}
      >
        {label}
        {description && (
          <div className="text-sm text-neutral-800 dark:text-neutral-800">
            {description}
          </div>
        )}
      </label>
    </div>
    {fieldMessage && <FieldMessage data={fieldMessage} />}
  </>
);
