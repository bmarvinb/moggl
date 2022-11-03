import { TagForm } from 'features/tags/components/TagForm';
import { useAddTag } from 'features/tags/hooks/addTag';
import { AddTagDTO } from 'features/tags/models/tags';
import { Dialog } from 'shared/components/Dialog';
import { DialogMode } from 'shared/models/dialog-mode';

export type AddTagDialog = {
  open: boolean;
  onOpenChange: () => void;
  onSuccess: () => void;
};

export const AddTagDialog = (props: AddTagDialog) => {
  const { mutate: addTag, status, error } = useAddTag();

  const onSubmit = (data: AddTagDTO) => {
    addTag(data, {
      onSuccess: props.onSuccess,
    });
  };

  return (
    <Dialog title="Add tag" isOpen={props.open} onClose={props.onOpenChange}>
      <TagForm
        operation={DialogMode.Add}
        loading={status === 'loading'}
        error={error?.message}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};
