import { useQueryClient } from '@tanstack/react-query';
import { Button } from 'shared/components/Button';
import { Card } from 'shared/components/Card';
import { Container } from 'shared/components/Container';
import { Dialog } from 'shared/components/Dialog';
import { Title } from 'shared/components/Title';
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
    <Container className="p-10">
      <div className="mb-8 flex justify-between align-baseline">
        <Title>Projects</Title>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button color="primary" onClick={() => setDialogOpen(true)}>
            Add new
          </Button>
          <AddProjectDialog onProjectAdded={onProjectAdded} />
        </Dialog>
      </div>
      <Card className="flex flex-col py-6 px-8">
        {props.projects.map(project => {
          return (
            <div key={project.id}>
              {project.id} - {project.name}
            </div>
          );
        })}
      </Card>
    </Container>
  );
};
