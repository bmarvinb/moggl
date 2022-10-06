import { PageSpinner } from 'common/components/PageSpinner';
import { useProjects } from 'features/projects/hooks/useProjects';

export const Projects = () => {
  const { status, data: projects } = useProjects();
  console.log('projects', projects);

  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      return <div>Projects</div>;
  }
};
