import { Head } from 'common/components/Elements/Head';
import { PageSpinner } from 'common/components/PageSpinner';
import { useProjects, ProjectsContent } from 'features/projects';

export const ProjectsPage = () => {
  const projects = useProjects();

  switch (projects.status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      return (
        <>
          <Head title="Projects" />
          <ProjectsContent projects={projects.data} />
        </>
      );
  }
};
