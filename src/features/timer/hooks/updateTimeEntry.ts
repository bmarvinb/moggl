import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { UpdateTimeEntryDTO } from 'features/timer/services/time-entry-dtos';
import { timeEntries } from 'features/timer/services/time-entries';

export function useUpdateTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((request: { id: string; data: UpdateTimeEntryDTO }) =>
    timeEntries.update(workspace.id, request.id, request.data),
  );
}
