import { Dialog, DialogContent } from 'shared/components/Dialog';
import { DialogMode } from 'layout/models/dialog-mode';
import { TagForm } from 'features/tags/components/TagForm';
import { useUpdateTag } from 'features/tags/hooks/updateTag';
import { Tag, UpdateTagRequestData } from 'features/tags/models/tags';
import { FC } from 'react';

export type UpdateTagDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag: Tag;
  onSuccess: () => void;
};

export const UpdateTagDialog: FC<UpdateTagDialogProps> = props => {
  const { mutate: updateTag, status, error } = useUpdateTag(props.tag.id);

  const onSubmit = (data: UpdateTagRequestData) => {
    updateTag(data, {
      onSuccess: props.onSuccess,
    });
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <div>
          <div className="mb-6 text-lg font-semibold">Update tag</div>
          <TagForm
            operation={DialogMode.Update}
            status={status}
            error={error?.message}
            tag={props.tag}
            onSubmit={onSubmit}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
