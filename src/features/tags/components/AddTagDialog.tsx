import { Dialog } from 'common/components/Dialog';
import { useAddTag } from '../hooks/useAddTag';
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
        error={error}
        onSubmit={onSubmit}
        action="Add"
      />
    </Dialog>
  );
};
