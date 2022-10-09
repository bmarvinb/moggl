import { Box } from 'common/components/Box';
import { DialogContent } from 'common/components/Dialog';
import { DialogMode } from 'core/models/application/dialog-mode';
import { TagForm } from 'features/tags/components/TagForm';
import { useAddTag } from 'features/tags/hooks/useAddTag';
import { AddTagRequestData } from 'features/tags/models/tags';
import { FC } from 'react';

export type AddTagDialog = {
  onSuccess: () => void;
};

export const AddTagDialog: FC<AddTagDialog> = props => {
  const { mutate, status } = useAddTag();

  const onSubmit = (data: AddTagRequestData) => {
    mutate(data, {
      onSuccess: () => props.onSuccess(),
    });
  };

  return (
    <DialogContent>
      <Box>
        <Box
          css={{
            fontWeight: '$semibold',
            fontSize: '$lg',
            mb: '$6',
          }}
        >
          Add new tag
        </Box>
        <TagForm
          operation={DialogMode.Add}
          status={status}
          onSubmit={onSubmit}
        />
      </Box>
    </DialogContent>
  );
};
