import { TagForm } from 'features/tags/components/TagForm';
import { useUpdateTag } from 'features/tags/hooks/updateTag';
import { Tag, UpdateTagDTO } from 'features/tags/models/tags';
import { Dialog } from 'shared/components/Dialog';
import { DialogMode } from 'shared/models/dialog-mode';

export type UpdateTagDialogProps = {
  open: boolean;
  tag: Tag;
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
};

export const UpdateTagDialog = (props: UpdateTagDialogProps) => {
  const { mutate: updateTag, status, error } = useUpdateTag(props.tag.id);

  const onSubmit = (data: UpdateTagDTO) => {
    updateTag(data, {
      onSuccess: props.onSuccess,
    });
  };

  return (
    <Dialog
      title="Update tag"
      isOpen={props.open}
      onClose={() => props.onOpenChange(false)}
    >
      <TagForm
        operation={DialogMode.Update}
        loading={status === 'loading'}
        error={error?.message}
        tag={props.tag}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};
