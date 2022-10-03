import { FC } from 'react';
import { styled } from 'core/theme/config';

const Container = styled('div', {
  color: '$red4',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const FullPageErrorFallback: FC<{ error: unknown }> = ({ error }) => (
  <Container role="alert">
    <p>There&apos;s a problem. Try refreshing the app.</p>
    <pre>{JSON.stringify(error)}</pre>
  </Container>
);
