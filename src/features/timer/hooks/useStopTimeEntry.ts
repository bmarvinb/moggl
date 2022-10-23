import { useMutation } from '@tanstack/react-query';
import { useCurrentUser } from 'features/auth/hooks/useCurrentUser';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { stopTimeEntry } from 'features/timer/services/time-entries-api';

export function useStopTimeEntry() {
  const workspace = useWorkspace();
  const user = useCurrentUser();
  return useMutation(() => stopTimeEntry(workspace.id, user.id));
}
