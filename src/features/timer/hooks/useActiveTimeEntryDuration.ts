import { ActiveTimeEntry } from 'features/timer/services/time-entries'
import { activeTimeEntryDuration } from 'features/timer/utils/time-entries-utils'
import { flow, pipe } from 'fp-ts/lib/function'
import * as O from 'fp-ts/lib/Option'
import { useEffect, useState } from 'react'

function getActiveTimeEntryDuration(
  activeTimeEntry: O.Option<ActiveTimeEntry>,
): O.Option<number> {
  return pipe(
    activeTimeEntry,
    O.map(({ timeInterval }) =>
      activeTimeEntryDuration(new Date(timeInterval.start)),
    ),
  )
}

export function useActiveTimeEntryDuration(
  activeTimeEntry: O.Option<ActiveTimeEntry>,
) {
  const [duration, setDuration] = useState<O.Option<number>>(
    getActiveTimeEntryDuration(activeTimeEntry),
  )
  useEffect(() => {
    const update = flow(getActiveTimeEntryDuration, setDuration)
    update(activeTimeEntry)
    const interval = setInterval(() => update(activeTimeEntry), 1000)
    return () => clearInterval(interval)
  }, [activeTimeEntry])
  return duration
}
