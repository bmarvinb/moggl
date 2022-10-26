import { useMutation } from '@tanstack/react-query';
import { useCurrentUser } from 'features/auth/hooks/currentUser';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { timeEntries } from 'features/timer/services/time-entries';

export function useStopTimeEntry() {
  const workspace = useWorkspace();
  const user = useCurrentUser();
  return useMutation(() => timeEntries.stop(workspace.id, user.id));
}
