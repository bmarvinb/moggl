import { TagForm, TagFormValues } from 'features/tags/components/TagForm';
import { TagDTO } from 'features/tags/models/tags';
import { Dialog } from 'components/Dialog';
import { useUpdateTag } from 'features/tags/api/updateTag';

export type UpdateTagDialogProps = {
  open: boolean;
  tag: TagDTO;
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
        error={error?.message}
        defaultValues={{
          name: props.tag.name,
        }}
        action="Update"
        onSubmit={onSubmit}
      />
    </Dialog>
  );
};
