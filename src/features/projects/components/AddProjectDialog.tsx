import { ProjectForm } from 'features/projects/components/ProjectForm';
import { Dialog } from 'shared/components/Dialog';

export type AddProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddProjectDialog = (props: AddProjectDialogProps) => {
  return (
    <Dialog title="Add new" isOpen={props.isOpen} onClose={props.onClose}>
      <ProjectForm onProjectAdded={props.onClose} />
    </Dialog>
  );
};
