import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import { activeTimeEntryDuration } from 'features/timer/utils/time-entries-utils'
import { useEffect, useState } from 'react'

function getDuration(activeTimeEntry: ActiveTimeEntry | undefined): number {
  return activeTimeEntry
    ? activeTimeEntryDuration(new Date(activeTimeEntry.timeInterval.start))
    : 0
}

export function useActiveDuration(
  activeTimeEntry: ActiveTimeEntry | undefined,
) {
  const [duration, setDuration] = useState(getDuration(activeTimeEntry))

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(getDuration(activeTimeEntry))
    }, 1000)

    return () => {
      clearInterval(interval)
    }
  }, [activeTimeEntry])

  return duration
}
