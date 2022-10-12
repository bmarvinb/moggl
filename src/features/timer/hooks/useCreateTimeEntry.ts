import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { AddTimeEntryRequestData } from 'features/timer/models/created-time-entry';
import { createTimeEntry } from 'features/timer/services/time-entries-api';

export function useCreateTimeEntry(onStart: () => void, onStop: () => void) {
  const workspace = useWorkspace();
  return useMutation(
    (data: AddTimeEntryRequestData) => createTimeEntry(workspace.id, data),
    {
      onMutate: onStart,
      onError: onStop,
    },
  );
}
