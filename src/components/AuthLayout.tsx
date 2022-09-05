import {FC} from 'react'
import styled from 'styled-components'
import theme from 'theme/index'

const Container = styled.div`
  display: flex;
  height: 100%;
`

const ChildContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 3rem;
  background: ${theme.pallete.white};
  height: 100%;

  @media ${theme.screens.sm} {
    width: 35rem;
    margin: auto;
  }

  @media ${theme.screens.xl} {
    margin: initial;
  }
`

const BackgroundContainer = styled.div`
  position: absolute;
  z-index: -1;
  height: 100%;
  width: 100%;
`

const BackgroundImage = styled.img`
  position: absolute;
  height: 100%;
  width: 100%;
`

export const AuthLayout: FC<{
  children: JSX.Element
}> = ({children}) => {
  return (
    <Container>
      <ChildContainer>{children}</ChildContainer>
      <BackgroundContainer>
        <BackgroundImage src="images/login-background.png" alt="Background" />
      </BackgroundContainer>
    </Container>
  )
}
