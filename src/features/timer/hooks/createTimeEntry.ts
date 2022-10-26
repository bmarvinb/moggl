import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { AddTimeEntryDTO } from 'features/timer/services/time-entry-dtos';
import { timeEntries } from 'features/timer/services/time-entries';

export function useAddTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((data: AddTimeEntryDTO) =>
    timeEntries.add(workspace.id, data),
  );
}
