import { PageSpinner } from 'components/PageSpinner';
import { ProjectsContent } from '../components/ProjectsContent';
import { useProjects } from '../hooks/projects';

export const Projects = () => {
  const { status, data: projects } = useProjects();

  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      return <ProjectsContent projects={projects} />;
  }
};
