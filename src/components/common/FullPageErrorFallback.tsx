import {FC} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  color: ${props => props.theme.pallete.red4};
  height: '100vh';
  display: 'flex';
  flex-direction: 'column';
  justify-content: 'center';
  align-items: 'center';
`

export const FullPageErrorFallback: FC<{error: unknown}> = ({error}) => (
  <Container role="alert">
    <p>There's a problem. Try refreshing the app.</p>
    <pre>{JSON.stringify(error)}</pre>
  </Container>
)
