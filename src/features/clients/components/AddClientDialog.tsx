import { Box } from 'common/components/Box';
import { DialogContent } from 'common/components/Dialog';
import { ClientForm } from 'features/clients/components/ClientForm';
import { FC } from 'react';

export type AddClientDialogProps = {
  onClientAdded: () => void;
};

export const AddClientDialog: FC<AddClientDialogProps> = props => {
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
          Add new client
        </Box>
        <ClientForm onClientAdded={props.onClientAdded} />
      </Box>
    </DialogContent>
  );
};
