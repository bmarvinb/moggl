import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { BiCheck, BiChevronDown } from 'react-icons/bi';
import { FieldLabel } from '../Form/FieldLabel';
import { FieldMessage, FieldMessageData } from '../Form/FieldMessage';

type SelectValue = string | number | undefined;

type SelectOption = {
  id: string;
  value: SelectValue;
  label: string;
};

type SelectProps = {
  id: string;
  name: string;
  label?: string;
  message?: string;
  fieldMessage?: FieldMessageData;
  value: SelectValue;
  options: SelectOption[];
  placeholder?: string;
  invalid?: boolean;
  disabled?: boolean;
  className?: string;
  onChange: (value: SelectValue) => void;
};

export type SelectOptions = SelectOption[];

export function Select({
  id,
  name,
  label,
  message,
  value,
  options,
  disabled,
  invalid,
  className,
  onChange,
  fieldMessage,
  placeholder = 'Please select',
  ...rest
}: SelectProps) {
  const content = options.find(option => option.value === value)?.label;

  return (
    <Listbox
      as={'ul'}
      name={name}
      value={value}
      onChange={onChange}
      disabled={disabled}
      multiple={false}
      {...rest}
    >
      {label && <FieldLabel label={label} htmlFor={id} disabled={disabled} />}

      <div className="relative">
        <Listbox.Button
          id={id}
          value={value}
          className={clsx(
            'block w-full min-w-0 rounded border bg-neutral-50 p-2 text-left focus:outline-none focus:ring-2 dark:bg-neutral-dark-400',
            content !== undefined
              ? 'text-neutral-900 dark:text-neutral-dark-900'
              : 'text-neutral-600 dark:text-neutral-dark-600',
            invalid
              ? 'border-red-400 focus:ring-red-300 dark:border-red-dark-400 dark:focus:ring-red-dark-400'
              : 'border-neutral-200 focus:border-primary-400 focus:ring-primary-300 dark:border-neutral-dark-300 dark:focus:border-primary-dark-400 dark:focus:ring-primary-dark-300',
            disabled &&
              'dark:placeholder-dark-600 bg-neutral-300/25 placeholder-neutral-600 dark:bg-neutral-dark-300/25',
            className,
          )}
        >
          <span className="block truncate">{content || placeholder}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <BiChevronDown
              className="dark:text-gray-dark-400 h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>

        <Transition
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-neutral-50 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-dark-400 sm:text-sm">
            {options.map(option => {
              return (
                <Listbox.Option
                  key={option.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active
                        ? 'bg-primary-400 text-neutral-50 dark:bg-primary-dark-400 dark:text-neutral-dark-900'
                        : 'text-neutral-900 dark:text-neutral-dark-900'
                    }`
                  }
                  value={option.value}
                >
                  {({ selected }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {option.label}
                      </span>
                      {selected ? (
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-neutral-900 dark:text-neutral-dark-900">
                          <BiCheck className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              );
            })}
          </Listbox.Options>
        </Transition>
      </div>

      {fieldMessage && <FieldMessage data={fieldMessage} />}
    </Listbox>
  );
}
