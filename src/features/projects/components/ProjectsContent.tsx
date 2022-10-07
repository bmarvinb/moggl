import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { PageTitle } from 'common/components/PageTitle';
import { Projects } from 'features/projects/models/projects';
import { FC } from 'react';

export type ProjectsContentProps = {
  projects: Projects;
};

export const ProjectsContent: FC<ProjectsContentProps> = props => {
  return (
    <Box
      css={{
        padding: '$8',
      }}
    >
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
        }}
      >
        <PageTitle>Projects</PageTitle>
        <Button color="primary">Create new</Button>
      </Box>
      {props.projects.map(project => {
        return <Box key={project.id}>{project.name}</Box>;
      })}
    </Box>
  );
};
