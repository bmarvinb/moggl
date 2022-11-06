import { Card } from 'components/Card/Card';
import { Container } from 'components/Container';
import { Button } from 'components/Elements/Button';
import { Title } from 'components/Title';
import React from 'react';
import { Projects } from '../models/projects';
import { AddProjectDialog } from './AddProjectDialog';

export type ProjectsContentProps = {
  projects: Projects;
};

export const ProjectsContent = (props: ProjectsContentProps) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const onProjectAdded = () => {
    setDialogOpen(false);
  };

  return (
    <Container className="p-10">
      <div className="mb-8 flex justify-between align-baseline">
        <Title>Projects</Title>
        <Button onClick={() => setDialogOpen(true)}>Add new</Button>
      </div>
      <AddProjectDialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
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
