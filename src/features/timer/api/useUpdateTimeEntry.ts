import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { UpdateTimeEntryDTO } from './timer-dtos';
import { timeEntries } from './timer-api';

export function useUpdateTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((request: { id: string; data: UpdateTimeEntryDTO }) =>
    timeEntries.update(workspace.id, request.id, request.data),
  );
}
