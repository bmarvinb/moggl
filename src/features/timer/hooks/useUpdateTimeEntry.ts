import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { UpdateTimeEntryDTO } from '../dtos/time-entry-dtos';
import { timeEntries } from '../services/time-entries';

export function useUpdateTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((request: { id: string; data: UpdateTimeEntryDTO }) =>
    timeEntries.update(workspace.id, request.id, request.data),
  );
}
