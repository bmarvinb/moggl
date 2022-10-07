import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { Dialog, DialogTrigger } from 'common/components/Dialog';
import { Title } from 'common/components/Title';
import { CreateProjectDialog } from 'features/projects/components/CreateProjectDialog';
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
          marginBottom: '$8',
        }}
      >
        <Title as="h1">Projects</Title>
        <Dialog>
          <DialogTrigger asChild>
            <Button color="primary">Create new</Button>
          </DialogTrigger>
          <CreateProjectDialog />
        </Dialog>
      </Box>
      {props.projects.map(project => {
        return <Box key={project.id}>{project.name}</Box>;
      })}
    </Box>
  );
};
