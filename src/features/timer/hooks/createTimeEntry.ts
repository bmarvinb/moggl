import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { timeEntries } from 'features/timer/services/time-entries';
import { AddTimeEntryDTO } from 'features/timer/services/time-entry-dtos';

export function useAddTimeEntry() {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation((data: AddTimeEntryDTO) =>
    timeEntries.add(workspace.id, data),
  );
}
