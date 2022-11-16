import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { timeEntries } from '../api';
import { AddTimeEntryDto } from '../api/types';

export function useAddTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((data: AddTimeEntryDto) =>
    timeEntries.add(workspace.id, data),
  );
}
