import { Box } from 'shared/components/Box';
import { DialogContent } from 'shared/components/Dialog';
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
          Add new project
        </Box>
        <ProjectForm onProjectAdded={props.onProjectAdded} />
      </Box>
    </DialogContent>
  );
};
