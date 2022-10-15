import { useQueryClient } from '@tanstack/react-query';
import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { Card } from 'common/components/Card';
import { Container } from 'common/components/Container';
import { Dialog } from 'common/components/Dialog';
import { Title } from 'common/components/Title';
import { AddProjectDialog } from 'features/projects/components/AddProjectDialog';
import { Projects } from 'features/projects/models/projects';
import { FC, useState } from 'react';

export type ProjectsContentProps = {
  projects: Projects;
};

export const ProjectsContent: FC<ProjectsContentProps> = props => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const onProjectAdded = () => {
    setDialogOpen(false);
    queryClient.invalidateQueries(['projects']);
  };

  return (
    <Container
      css={{
        padding: '$10',
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
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button color="primary" onClick={() => setDialogOpen(true)}>
            Add new
          </Button>
          <AddProjectDialog onProjectAdded={onProjectAdded} />
        </Dialog>
      </Box>
      <Card
        css={{
          padding: '$6 $8',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {props.projects.map(project => {
          return (
            <Box key={project.id}>
              {project.id} - {project.name}
            </Box>
          );
        })}
      </Card>
    </Container>
  );
};
