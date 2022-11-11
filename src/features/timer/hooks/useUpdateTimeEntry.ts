import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { timeEntries } from '../api/timer-api';
import { UpdateTimeEntryDTO } from '../api/timer-dtos';

export function useUpdateTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((request: { id: string; data: UpdateTimeEntryDTO }) =>
    timeEntries.update(workspace.id, request.id, request.data),
  );
}
