import { Dialog, DialogContent } from 'shared/components/Dialog';
import { DialogMode } from 'layout/models/dialog-mode';
import { TagForm } from 'features/tags/components/TagForm';
import { useAddTag } from 'features/tags/hooks/addTag';
import { AddTagRequestData } from 'features/tags/models/tags';
import { FC } from 'react';

export type AddTagDialog = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
};

export const AddTagDialog: FC<AddTagDialog> = props => {
  const { mutate: addTag, status, error } = useAddTag();

  const onSubmit = (data: AddTagRequestData) => {
    addTag(data, {
      onSuccess: props.onSuccess,
    });
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <div>
          <div className="mb-6 text-lg font-semibold">Add new tag</div>
          <TagForm
            operation={DialogMode.Add}
            status={status}
            error={error?.message}
            onSubmit={onSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
