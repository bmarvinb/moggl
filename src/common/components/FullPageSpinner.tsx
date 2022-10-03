import { styled } from 'core/theme/config';
import { Spinner } from './Spinner';

const SpinnerContainer = styled('div', {
  fontSize: '4rem',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  background: '$neutral1',
});

export const FullPageSpinner = () => {
  return (
    <SpinnerContainer>
      <Spinner />
    </SpinnerContainer>
  );
};
