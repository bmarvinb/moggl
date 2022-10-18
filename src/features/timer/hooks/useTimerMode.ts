import { useState } from 'react';

export type TimerMode = 'manual' | 'timer';

export function useTimerMode(): [TimerMode, (mode: TimerMode) => void] {
  const [timerMode, setTimerMode] = useState<TimerMode>('timer');

  return [timerMode, setTimerMode];
}
