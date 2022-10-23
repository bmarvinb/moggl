import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { deleteTimeEntry } from 'features/timer/services/time-entries-api';

export function useDeleteTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((id: string) => deleteTimeEntry(workspace.id, id));
}
