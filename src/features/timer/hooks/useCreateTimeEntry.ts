import { useMutation } from '@tanstack/react-query';
import { useAuthorizedUserInfo } from 'features/auth/hooks/useAuthorizedUserInfo';
import { AddTimeEntryRequestData } from 'features/timer/models/created-time-entry';
import { createTimeEntry } from 'features/timer/services/time-entries-api';

export function useCreateTimeEntry(onStart: () => void, onStop: () => void) {
  const userInfo = useAuthorizedUserInfo();
  return useMutation(
    (data: AddTimeEntryRequestData) =>
      createTimeEntry(userInfo.workspace.id, data),
    {
      onMutate: onStart,
      onError: onStop,
    },
  );
}
