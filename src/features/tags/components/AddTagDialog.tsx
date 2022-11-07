import { Dialog } from 'components/Dialog';
import { useAddTag } from '../api/addTag';
import { TagForm, TagFormValues } from './TagForm';

type AddTagDialogProps = {
  open: boolean;
  onOpenChange: () => void;
  onSuccess: () => void;
};

export const AddTagDialog = ({
  open,
  onOpenChange,
  onSuccess,
}: AddTagDialogProps) => {
  const { mutate: addTag, status, error } = useAddTag();

  const onSubmit = (data: TagFormValues) => {
    addTag(data, {
      onSuccess: onSuccess,
    });
  };

  return (
    <Dialog title="Add tag" isOpen={open} onClose={onOpenChange}>
      <TagForm
        loading={status === 'loading'}
        error={error?.message}
        onSubmit={onSubmit}
        action="Add"
      />
    </Dialog>
  );
};
