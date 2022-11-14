import { Card } from 'common/components/Card/Card';
import { Container } from 'common/components/Container';
import { Button } from 'common/components/Elements/Button';
import { Title } from 'common/components/Title';
import React from 'react';
import { ProjectDto } from '../api/project-dtos';
import { AddProjectDialog } from './AddProjectDialog';

export type ProjectsContentProps = {
  projects: ProjectDto[];
};

export const ProjectsContent = (props: ProjectsContentProps) => {
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const onProjectAdded = () => {
    setDialogOpen(false);
  };

  return (
    <Container>
      <div className="mb-5 flex items-center justify-between">
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
