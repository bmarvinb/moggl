import { styled } from 'core/theme/config';
import { FC } from 'react';

const Container = styled('div', {
  background: '$neutral1',
  color: '$red5',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
});

export const FullPageErrorFallback: FC<{ error: unknown }> = () => (
  <Container role="alert">
    <p>There&apos;s a problem. Try refreshing the app.</p>
  </Container>
);
