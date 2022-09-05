import {BiLoaderAlt} from 'react-icons/bi'
import styled, {keyframes} from 'styled-components'
import theme from 'theme/index'

const spin = keyframes`
  from {transform: rotate(0deg)};
  to {transform: rotate(360deg)};
`

const Spinner = styled(BiLoaderAlt)`
  animation: ${spin} 1s linear infinite;
  color: ${theme.pallete.blueGrey4};
`
Spinner.defaultProps = {
  'aria-label': 'loading',
}

const SpinnerContainer = styled.div`
  font-size: 4em;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FullPageSpinner = () => (
  <SpinnerContainer>
    <Spinner />
  </SpinnerContainer>
)
