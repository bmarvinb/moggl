import React from 'react';
import { FieldLabel } from 'common/components/Form/FieldLabel';
import {
  FieldMessage,
  FieldMessageVariant,
} from 'common/components/Form/FieldMessage';
import { Input } from 'common/components/Form/Input';

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  id: string;
  label: string;
  message?: string;
  variant?: FieldMessageVariant;
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
      variant = 'neutral',
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
          invalid={message !== undefined && variant === 'critical'}
          disabled={disabled}
          {...rest}
        />
        {message && (
          <FieldMessage
            id={`${id}_message`}
            variant={variant}
            message={message}
          />
        )}
      </div>
    );
  },
);
TextField.displayName = 'TextField';
