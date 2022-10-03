import { useMutation } from '@tanstack/react-query';
import { useUserInfo } from 'features/auth';
import { CreateTimeEntryPayload } from 'features/timer/services/created-time-entry';
import { createTimeEntry } from 'features/timer/services/time-entries-api';
import * as O from 'fp-ts/lib/Option';

export function useCreateTimeEntry(onStart: () => void, onStop: () => void) {
  const userInfo = useUserInfo();
  if (O.isNone(userInfo)) {
    throw new Error('Unauthorized user');
  }
  return useMutation(
    (payload: CreateTimeEntryPayload) => {
      return createTimeEntry(userInfo.value.workspace.id, payload);
    },
    {
      onMutate: onStart,
      onError: onStop,
    },
  );
}
