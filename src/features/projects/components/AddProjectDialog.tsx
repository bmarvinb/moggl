import { Dialog } from 'common/components/Dialog';
import { useAddProject } from '../api/useAddProject';
import { ProjectForm, ProjectFormValues } from './ProjectForm';

export type AddProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const AddProjectDialog = (props: AddProjectDialogProps) => {
  const { mutate: addProject, status, error } = useAddProject();

  const onSubmit = (data: ProjectFormValues) => {
    addProject(data, {
      onSuccess: props.onClose,
    });
  };

  return (
    <Dialog
      title="Add new project"
      isOpen={props.isOpen}
      onClose={props.onClose}
    >
      <ProjectForm
        loading={status === 'loading'}
        submitText="Add"
        error={error}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};
