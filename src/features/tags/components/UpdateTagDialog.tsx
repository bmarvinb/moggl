import { TagForm } from 'features/tags/components/TagForm';
import { useUpdateTag } from 'features/tags/hooks/updateTag';
import { Tag, UpdateTagDTO } from 'features/tags/models/tags';
import { Dialog, DialogContent } from 'shared/components/Dialog';
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
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <div className="mb-4 text-lg font-semibold text-neutral-50 dark:text-neutral-dark-900">
          Update tag
        </div>

        <TagForm
          operation={DialogMode.Update}
          loading={status === 'loading'}
          error={error?.message}
          tag={props.tag}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
