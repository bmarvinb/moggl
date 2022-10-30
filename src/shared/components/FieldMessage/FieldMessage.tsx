import React from 'react';
import { IconType } from 'react-icons';
import { BiCheckCircle, BiXCircle } from 'react-icons/bi';
import { cn } from 'theme/utils';

export type FieldMessageTone = 'critical' | 'positive' | 'neutral';

export type FieldMessageProps = {
  message: string;
  tone?: FieldMessageTone;
};

function classes(tone: FieldMessageTone) {
  const tones: Record<FieldMessageTone, string> = {
    critical: 'text-red-400 dark:text-redDark-400',
    positive: 'text-cyan-400 dark:text-cyanDark-400',
    neutral: 'text-neutral-800 dark:text-neutralDark-800',
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

export const FieldMessage = ({
  message,
  tone = 'neutral',
}: FieldMessageProps) => {
  const fieldMessageClasses = classes(tone);
  return (
    <div
      className={cn(
        'pt-1 text-sm flex items-center gap-1',
        fieldMessageClasses,
      )}
    >
      {icon(tone)} {message}
    </div>
  );
};
