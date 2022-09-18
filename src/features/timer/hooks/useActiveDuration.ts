import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import { activeTimeEntryDuration } from 'features/timer/utils/time-entries-utils'
import { flow } from 'fp-ts/lib/function'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

function getActiveTimeEntryDuration(
  activeTimeEntry: ActiveTimeEntry | undefined,
): number | undefined {
  return activeTimeEntry
    ? activeTimeEntryDuration(new Date(activeTimeEntry.timeInterval.start))
    : undefined
}

export function useActiveDuration(
  activeTimeEntry: ActiveTimeEntry | undefined,
): [number | undefined, Dispatch<SetStateAction<number | undefined>>] {
  const [duration, setDuration] = useState(
    getActiveTimeEntryDuration(activeTimeEntry),
  )
  useEffect(() => {
    const update = flow(getActiveTimeEntryDuration, setDuration)
    update(activeTimeEntry)
    const interval = setInterval(() => update(activeTimeEntry), 1000)
    return () => clearInterval(interval)
  }, [activeTimeEntry])
  return [duration, setDuration]
}
