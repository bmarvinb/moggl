import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth';
import { timeEntries } from './timer-api';

export function useDeleteTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((id: string) => timeEntries.remove(workspace.id, id));
}
