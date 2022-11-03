import React from 'react';
import { FieldLabel } from 'shared/components/FieldLabel';
import { FieldMessage, FieldMessageTone } from 'shared/components/FieldMessage';
import { Input } from 'shared/components/Input';

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  message?: string;
  tone?: FieldMessageTone;
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
      message,
      placeholder,
      disabled,
      tone = 'neutral',
      ...rest
    },
    ref,
  ) => {
    return (
      <div className={className}>
        <FieldLabel label={label} htmlFor={id} disabled={disabled} />
        <Input
          id={id}
          ref={ref}
          placeholder={placeholder}
          invalid={!!message && tone === 'critical'}
          disabled={disabled}
          {...rest}
        />
        {message && (
          <FieldMessage id={`${id}_message`} tone={tone} message={message} />
        )}
      </div>
    );
  },
);
TextField.displayName = 'TextField';
