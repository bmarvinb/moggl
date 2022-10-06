import { useMutation } from '@tanstack/react-query';
import { useAuthorizedUserInfo } from 'features/auth/hooks/useAuthorizedUserInfo';
import { CreateTimeEntryPayload } from 'features/timer/models/created-time-entry';
import { createTimeEntry } from 'features/timer/services/time-entries-api';

export function useCreateTimeEntry(onStart: () => void, onStop: () => void) {
  const userInfo = useAuthorizedUserInfo();
  return useMutation(
    (payload: CreateTimeEntryPayload) => {
      return createTimeEntry(userInfo.workspace.id, payload);
    },
    {
      onMutate: onStart,
      onError: onStop,
    },
  );
}
