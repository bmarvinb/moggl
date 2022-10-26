import { useQueryClient } from '@tanstack/react-query';
import { Box } from 'shared/components/Box';
import { Button } from 'shared/components/Button';
import { Card } from 'shared/components/Card';
import { Container } from 'shared/components/Container';
import { Dialog } from 'shared/components/Dialog';
import { Title } from 'shared/components/Title';
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
    <Container
      css={{
        padding: '$10',
      }}
    >
      <Box
        css={{
          display: 'flex',
          flexDirection: 'row',
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
      <Card
        css={{
          padding: '$6 $8',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {props.clients.map(client => {
          return <Box key={client.id}>{client.name}</Box>;
        })}
      </Card>
    </Container>
  );
};
