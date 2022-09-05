import {FC} from 'react'
import theme from 'theme/index'
import 'styled-components/macro'

export const AuthLayout: FC<{
  children: JSX.Element
}> = ({children}) => {
  return (
    <div
      css={`
        display: flex;
        height: 100%;
      `}
    >
      <div
        css={`
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
        `}
      >
        {children}
      </div>
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
