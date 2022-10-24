import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { AddTimeEntryRequestData } from 'features/timer/models/time-entries';
import { addTimeEntry } from 'features/timer/services/time-entries-api';

export function useAddTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((data: AddTimeEntryRequestData) =>
    addTimeEntry(workspace.id, data),
  );
}
