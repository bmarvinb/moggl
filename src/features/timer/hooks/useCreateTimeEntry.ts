import { useMutation } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { NewTimeEntry } from 'features/timer/models/time-entries';
import { createTimeEntry } from 'features/timer/services/time-entries-api';

export function useCreateTimeEntry() {
  const workspace = useWorkspace();
  return useMutation((data: NewTimeEntry) =>
    createTimeEntry(workspace.id, data),
  );
}
