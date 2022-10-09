import { PageSpinner } from 'common/components/PageSpinner';
import { ClientsContent } from 'features/clients/components/ClientsContent';
import { useClients } from 'features/clients/hooks/useClients';

export const Clients = () => {
  const { status, data: clients } = useClients();

  switch (status) {
    case 'loading':
      return <PageSpinner />;
    case 'error':
      return <div>Error</div>;
    case 'success':
      return <ClientsContent clients={clients} />;
  }
};
