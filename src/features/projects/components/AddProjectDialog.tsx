import { ProjectForm } from 'features/projects/components/ProjectForm';
import { DialogContent } from 'shared/components/Dialog';

export type AddProjectDialogProps = {
  onProjectAdded: () => void;
};

export const AddProjectDialog = (props: AddProjectDialogProps) => {
  return (
    <DialogContent>
      <div>
        <div className="mb-6 text-lg font-semibold">Add new project</div>
        <ProjectForm onProjectAdded={props.onProjectAdded} />
      </div>
    </DialogContent>
  );
};
