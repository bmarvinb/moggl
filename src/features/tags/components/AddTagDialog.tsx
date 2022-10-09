import { Box } from 'common/components/Box';
import { DialogContent } from 'common/components/Dialog';
import { TagForm } from 'features/tags/components/TagForm';
import { FC } from 'react';

export type AddTagDialogProps = {
  onTagAdded: () => void;
};

export const AddTagDialog: FC<AddTagDialogProps> = props => {
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
        <TagForm onTagAdded={props.onTagAdded} />
      </Box>
    </DialogContent>
  );
};
