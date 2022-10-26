import { useQuery } from '@tanstack/react-query';
import { useWorkspace } from 'features/auth/hooks/workspace';
import { getAllProjects } from 'features/projects/services/projects-api';

export function useProjects() {
  const workspace = useWorkspace();
  return useQuery(['projects'], () =>
    getAllProjects(workspace.id, { hydrated: false }),
  );
}
