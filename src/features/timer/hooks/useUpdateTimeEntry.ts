import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { timeEntries } from '../api';
import { UpdateTimeEntryDto } from '../api/types';

export function useUpdateTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((request: { id: string; data: UpdateTimeEntryDto }) =>
    timeEntries.update(workspace.id, request.id, request.data),
  );
}
