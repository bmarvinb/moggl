import { styled } from 'theme/config'
import { Spinner } from './Spinner'

const SpinnerContainer = styled('div', {
  fontSize: '$lg',
  height: '100vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

export const FullPageSpinner = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
)
