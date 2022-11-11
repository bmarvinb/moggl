import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { timeEntries } from '../api/timer-api';
import { AddTimeEntryDTO } from '../api/timer-dtos';

export function useAddTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((data: AddTimeEntryDTO) =>
    timeEntries.add(workspace.id, data),
  );
}
