import { Dialog } from 'common/components/Dialog';
import { useUpdateTag } from '../hooks/useUpdateTag';
import { Tag } from '../types';
import { TagForm, TagFormValues } from './TagForm';

export type UpdateTagDialogProps = {
  open: boolean;
  tag: Tag;
  onSuccess: () => void;
  onOpenChange: (open: boolean) => void;
};

export const UpdateTagDialog = (props: UpdateTagDialogProps) => {
  const { mutate: updateTag, status, error } = useUpdateTag(props.tag.id);

  const onSubmit = (data: TagFormValues) => {
    updateTag(
      { ...props.tag, ...data },
      {
        onSuccess: props.onSuccess,
      },
    );
  };

  return (
    <Dialog
      title="Update tag"
      isOpen={props.open}
      onClose={() => props.onOpenChange(false)}
    >
      <TagForm
        loading={status === 'loading'}
        submitText="Update"
        error={error}
        defaultValues={{
          name: props.tag.name,
        }}
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};
