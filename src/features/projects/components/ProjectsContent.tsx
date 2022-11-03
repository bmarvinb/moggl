import { useQueryClient } from '@tanstack/react-query';
import { AddProjectDialog } from 'features/projects/components/AddProjectDialog';
import { ProjectForm } from 'features/projects/components/ProjectForm';
import { Projects } from 'features/projects/models/projects';
import React from 'react';
import { Button } from 'shared/components/Button';
import { Card } from 'shared/components/Card/Card';
import { Container } from 'shared/components/Container';
import { Dialog } from 'shared/components/Dialog';
import { Title } from 'shared/components/Title';

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
