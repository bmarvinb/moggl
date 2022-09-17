import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import { activeTimeEntryDuration } from 'features/timer/utils/time-entries-utils'
import { pipe } from 'fp-ts/lib/function'
import { useEffect, useState } from 'react'

function getDuration(activeTimeEntry: ActiveTimeEntry | undefined): number {
  return activeTimeEntry
    ? activeTimeEntryDuration(new Date(activeTimeEntry.timeInterval.start))
    : 0
}

export function useActiveDuration(
  activeTimeEntry: ActiveTimeEntry | undefined,
) {
  const timeEntryDuration = getDuration(activeTimeEntry)
  const [duration, setDuration] = useState(timeEntryDuration)
  useEffect(() => {
    const interval = setInterval(
      () => pipe(activeTimeEntry, getDuration, setDuration),
      1000,
    )
    return () => clearInterval(interval)
  }, [activeTimeEntry])
  return duration
}
