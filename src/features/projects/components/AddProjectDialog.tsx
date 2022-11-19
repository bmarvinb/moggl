import { Dialog } from 'common/components/Dialog';
import { useAddProject } from '../api/useAddProject';
import { SelectOptions } from './ColorPicker';
import { ProjectForm, ProjectFormValues } from './ProjectForm';

export type AddProjectDialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

// TODO: use real clients
const clientOptions: SelectOptions = [
  {
    id: '0',
    value: undefined,
    label: 'No client',
  },
  {
    id: '1',
    value: 'client-1',
    label: 'Client 1',
  },
  {
    id: '2',
    value: 'client-2',
    label: 'Client 2',
  },
];

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
        clients={clientOptions}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};
