import { Listbox, Transition } from '@headlessui/react';
import clsx from 'clsx';
import { BiCheck } from 'react-icons/bi';
import { ProjectColor } from '../constants/colors';

type SelectedColor = string | undefined;

type SelectProps = {
  name: string;
  label: string;
  value: SelectedColor;
  options: ProjectColor[];
  className?: string;
  onChange: (value: SelectedColor) => void;
};

export type SelectOptions = ProjectColor[];

export function ColorPicker({
  name,
  label,
  value,
  options,
  className,
  onChange,
  ...rest
}: SelectProps) {
  console.log('value', value);

  return (
    <Listbox
      as={'ul'}
      name={name}
      value={value}
      onChange={onChange}
      horizontal={true}
      {...rest}
    >
      <div className="flex">
        <Listbox.Label
          className={clsx(
            'pr-3 text-sm font-semibold text-neutral-800 hover:cursor-pointer dark:text-neutral-dark-800',
          )}
        >
          {label}:
        </Listbox.Label>

        <Listbox.Button
          value={value}
          className={clsx(
            'block h-6 w-6 rounded-full p-2 ring-neutral-100 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-0 dark:ring-neutral-dark-300',
            className,
          )}
          title="Select color"
          style={{ background: value }}
        ></Listbox.Button>
      </div>
      <Transition
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <Listbox.Options className="absolute mt-1 flex flex-row flex-wrap gap-3 overflow-auto rounded-md bg-neutral-50 p-2 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-neutral-dark-400 sm:text-sm">
          {options.map(option => {
            return (
              <Listbox.Option
                key={option.id}
                className={({ active }) =>
                  clsx(
                    `align-center relative flex h-6 w-6 cursor-pointer select-none justify-center rounded-full hover:opacity-90`,
                    active &&
                      'ring-2 ring-neutral-100 ring-offset-0 dark:ring-neutral-dark-300',
                  )
                }
                style={{ background: option.value }}
                value={option.value}
              >
                {({ selected }) => (
                  <>
                    {selected ? (
                      <span className="m-auto text-neutral-50 dark:text-neutral-dark-900">
                        <BiCheck className="" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            );
          })}
        </Listbox.Options>
      </Transition>
    </Listbox>
  );
}
