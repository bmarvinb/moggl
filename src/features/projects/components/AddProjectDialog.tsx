import { Dialog } from 'common/components/Dialog';
import { ProjectForm } from './ProjectForm';

export type AddProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddProjectDialog = (props: AddProjectDialogProps) => {
  return (
    <Dialog
      title="Add new project"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ProjectForm onProjectAdded={props.onClose} />
    </Dialog>
  );
};
