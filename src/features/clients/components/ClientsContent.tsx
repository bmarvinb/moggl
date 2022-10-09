import { useQueryClient } from '@tanstack/react-query';
import { Box } from 'common/components/Box';
import { Button } from 'common/components/Button';
import { Dialog } from 'common/components/Dialog';
import { Title } from 'common/components/Title';
import { AddClientDialog } from 'features/clients/components/AddClientDialog';
import { Clients } from 'features/clients/models/clients';
import { FC, useState } from 'react';

export type ClientsContentProps = {
  clients: Clients;
};

export const ClientsContent: FC<ClientsContentProps> = props => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const queryClient = useQueryClient();

  const onClientAdded = () => {
    setDialogOpen(false);
    queryClient.invalidateQueries(['clients']);
  };

  return (
    <Box
      css={{
        padding: '$8',
      }}
    >
      <Box
        css={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'baseline',
          marginBottom: '$8',
        }}
      >
        <Title as="h1">Clients</Title>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <Button color="primary" onClick={() => setDialogOpen(true)}>
            Add new
          </Button>
          <AddClientDialog onClientAdded={onClientAdded} />
        </Dialog>
      </Box>
      {props.clients.map(client => {
        return <Box key={client.id}>{client.name}</Box>;
      })}
    </Box>
  );
};
