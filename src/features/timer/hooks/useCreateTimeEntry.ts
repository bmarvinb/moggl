import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { AddTimeEntryDTO } from '../api/time-entry-dtos';
import { timeEntries } from '../api/time-entries';

export function useAddTimeEntry() {
  const workspace = useWorkspace();
  const queryClient = useQueryClient();
  return useMutation((data: AddTimeEntryDTO) =>
    timeEntries.add(workspace.id, data),
  );
}
