import { FC } from 'react'
import 'styled-components/macro'
import styled from 'styled-components/macro'

const Children = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6rem 3rem;
  background: ${({ theme }) => `#fff`};
  height: 100%;

  @media ${({ theme }) => theme.screen.sm} {
    width: 35rem;
    margin: auto;
  }

  @media ${({ theme }) => theme.screen.xl} {
    margin: initial;
  }
`

export const AuthLayout: FC<{
  children: JSX.Element
}> = ({ children }) => {
  return (
    <div
      css={`
        display: flex;
        height: 100%;
      `}
    >
      <Children>{children}</Children>
      <div
        css={`
          position: absolute;
          z-index: -1;
          height: 100%;
          width: 100%;
        `}
      >
        <img
          css={`
            position: absolute;
            height: 100%;
            width: 100%;
          `}
          src="images/login-background.png"
          alt="Background"
        />
      </div>
    </div>
  )
}
