import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/useWorkspace';
import { getAllProjects } from 'features/projects/services/projects-api';

export function useProjects() {
  const workspace = useWorkspace();
  return useQuery(['projects'], () =>
    getAllProjects(workspace.id, { hydrated: false }),
  );
}
