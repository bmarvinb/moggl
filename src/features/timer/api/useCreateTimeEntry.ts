import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { timeEntries } from './timer-api';
import { AddTimeEntryDTO } from './timer-dtos';

export function useAddTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((data: AddTimeEntryDTO) =>
    timeEntries.add(workspace.id, data),
  );
}
