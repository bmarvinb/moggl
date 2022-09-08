import styled from 'styled-components'
import { Spinner } from './Spinner'

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
