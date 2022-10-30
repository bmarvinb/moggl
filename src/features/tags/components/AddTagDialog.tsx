import { TagForm } from 'features/tags/components/TagForm';
import { useAddTag } from 'features/tags/hooks/addTag';
import { AddTagDTO } from 'features/tags/models/tags';
import { Dialog, DialogContent } from 'shared/components/Dialog';
import { DialogMode } from 'shared/models/dialog-mode';

export type AddTagDialog = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
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
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <div className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutralDark-900">
          Add new tag
        </div>

        <TagForm
          operation={DialogMode.Add}
          loading={status === 'loading'}
          error={error?.message}
          onSubmit={onSubmit}
        />
      </DialogContent>
    </Dialog>
  );
};
