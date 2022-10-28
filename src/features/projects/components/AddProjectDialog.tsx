import { DialogContent } from 'shared/components/Dialog';
import { ProjectForm } from 'features/projects/components/ProjectForm';
import { FC } from 'react';

export type AddProjectDialogProps = {
  onProjectAdded: () => void;
};

export const AddProjectDialog: FC<AddProjectDialogProps> = props => {
  return (
    <DialogContent>
      <div>
        <div className="mb-6 text-lg font-semibold">Add new project</div>
        <ProjectForm onProjectAdded={props.onProjectAdded} />
      </div>
    </DialogContent>
  );
};
