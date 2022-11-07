import { Head } from 'components/Elements/Head';
import { PageSpinner } from 'components/PageSpinner';
import { useGetProjects, ProjectsContent } from 'features/projects';

export const ProjectsPage = () => {
  const { status, data: projects } = useGetProjects();

  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      return (
        <>
          <Head title="Projects" />
          <ProjectsContent projects={projects} />
        </>
      );
  }
};
