import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useCurrentUser } from 'features/auth/hooks/useCurrentUser';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { stopTimeEntry } from 'features/timer/services/time-entries-api';

export function useStopTimeEntry({ onSuccess }: { onSuccess: () => void }) {
  const workspace = useWorkspace();
  const user = useCurrentUser();
  const queryClient = useQueryClient();
  return useMutation(() => stopTimeEntry(workspace.id, user.id), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(['timeEntries']);
      onSuccess();
    },
  });
}
