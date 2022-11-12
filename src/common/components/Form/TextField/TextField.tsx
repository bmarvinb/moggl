import { FieldLabel } from 'common/components/Form/FieldLabel';
import {
  FieldMessage,
  FieldMessageData,
} from 'common/components/Form/FieldMessage';
import { Input } from 'common/components/Form/Input';
import React from 'react';

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  invalid?: boolean;
  fieldMessage?: FieldMessageData;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
};

export const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      className,
      id,
      label,
      invalid,
      fieldMessage,
      placeholder,
      disabled,
      ...rest
    },
    ref,
  ) => {
    console.log('rest', rest);

    return (
      <div className={className}>
        <FieldLabel label={label} htmlFor={id} disabled={disabled} />
        <Input
          id={id}
          ref={ref}
          placeholder={placeholder}
          invalid={invalid}
          disabled={disabled}
          {...rest}
        />
        {fieldMessage && <FieldMessage data={fieldMessage} />}
      </div>
    );
  },
);
TextField.displayName = 'TextField';
