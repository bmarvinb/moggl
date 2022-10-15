import { Box } from 'common/components/Box';
import { Dialog, DialogContent } from 'common/components/Dialog';
import { DialogMode } from 'core/models/application/dialog-mode';
import { TagForm } from 'features/tags/components/TagForm';
import { useUpdateTag } from 'features/tags/hooks/useUpdateTag';
import { Tag, UpdateTagRequestData } from 'features/tags/models/tags';
import { FC } from 'react';

export type UpdateTagDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  tag: Tag;
  onSuccess: () => void;
};

export const UpdateTagDialog: FC<UpdateTagDialogProps> = props => {
  const { mutate, status } = useUpdateTag(props.tag.id);

  const onSubmit = (data: UpdateTagRequestData) => {
    mutate(data, {
      onSuccess: () => props.onSuccess(),
    });
  };

  return (
    <Dialog open={props.open} onOpenChange={props.onOpenChange}>
      <DialogContent>
        <Box>
          <Box
            css={{
              fontWeight: '$semibold',
              fontSize: '$lg',
              mb: '$6',
            }}
          >
            Update tag
          </Box>
          <TagForm
            operation={DialogMode.Update}
            status={status}
            tag={props.tag}
            onSubmit={onSubmit}
          />
        </Box>
      </DialogContent>
    </Dialog>
  );
};
