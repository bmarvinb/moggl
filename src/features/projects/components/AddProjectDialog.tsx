import { Box } from 'common/components/Box';
import { DialogContent } from 'common/components/Dialog';
import { ProjectForm } from 'features/projects/components/ProjectForm';
import { FC } from 'react';

export type AddProjectDialogProps = {
  onProjectAdded: () => void;
};

export const AddProjectDialog: FC<AddProjectDialogProps> = props => {
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
          Create new project
        </Box>
        <ProjectForm onProjectAdded={props.onProjectAdded} />
      </Box>
    </DialogContent>
  );
};
