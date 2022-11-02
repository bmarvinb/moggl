import React from 'react';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { cn } from 'theme/utils';

export type FieldMessageTone = 'critical' | 'positive' | 'neutral';

export type FieldMessageProps = {
  id: string;
  message: string;
  tone?: FieldMessageTone;
};

function classes(tone: FieldMessageTone) {
  const tones: Record<FieldMessageTone, string> = {
    critical: 'text-red-400 dark:text-red-dark-400',
    positive: 'text-cyan-400 dark:text-cyan-dark-400',
    neutral: 'text-neutral-800 dark:text-neutral-dark-800',
  };
  return cn(tones[tone]);
}

function icon(tone: FieldMessageTone) {
  const icons: Record<FieldMessageTone, React.ReactNode> = {
    critical: <BiXCircle />,
    positive: <BiCheckCircle />,
    neutral: null,
  };
  return icons[tone];
}

// TODO: learn how to use aria-describedby
export const FieldMessage = ({
  message,
  tone = 'neutral',
}: FieldMessageProps) => {
  const fieldMessageClasses = classes(tone);
  return (
    <div
      className={cn(
        'flex items-center gap-1 pt-1 text-sm',
        fieldMessageClasses,
      )}
    >
      {icon(tone)} {message}
    </div>
  );
};
