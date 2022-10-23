import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { UpdateTimeEntryRequestData } from 'features/timer/models/time-entries';
import { updateTimeEntry } from 'features/timer/services/time-entries-api';

export function useUpdateTimeEntry() {
  const workspace = useWorkspace();
  return useMutation(
    (request: { id: string; data: UpdateTimeEntryRequestData }) =>
      updateTimeEntry(workspace.id, request.id, request.data),
  );
}
