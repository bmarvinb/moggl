import React from 'react';
import { FieldError } from 'shared/components/FieldError';
import { FieldLabel } from 'shared/components/FieldLabel';
import { Input, InputSize } from 'shared/components/Input';
import { DefaultProps } from 'theme/types';

export type TextFieldProps = DefaultProps &
  React.InputHTMLAttributes<HTMLInputElement> & {
    id: string;
    label: string;
    message?: string;
    tone?: 'critical' | 'positive' | 'neutral';
    size?: InputSize;
    placeholder?: string;
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
      size = 'md',
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
          <div className="pt-1 text-sm text-red-400 dark:text-redDark-400">
            {message}
          </div>
        )}
      </div>
    );
  },
);
TextField.displayName = 'TextField';
