import { useMachine } from '@xstate/react'
import { UserInfo } from 'auth/context/auth-context'
import { Sidebar } from 'components/Sidebar'
import { sidebarMachine } from 'machines/sidebarMachine'
import { TimerPage } from 'pages/TimerPage'
import { FC } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Navigate, Route, Routes } from 'react-router-dom'
import 'styled-components/macro'

export type AuthenticatedAppProps = {
  userInfo: UserInfo
}

export const AuthenticatedApp: FC<AuthenticatedAppProps> = props => {
  const [state, send] = useMachine(sidebarMachine)
  return (
    <main
      css={`
        display: flex;
        flex-direction: column;
        height: 100%;
      `}
    >
      <div
        css={`
          display: flex;
        `}
      >
        {/* <Sidebar
          expanded={state.matches('expanded')}
          onModeChanged={() => send('TOGGLE.SIDEBAR')}
        ></Sidebar> */}

        <div
          css={`
            display: flex;
            flex-direction: column;
            flex: 1;
          `}
        >
          <nav
            css={`
              background: var(--primary4);
              color: var(--neutral0);
              padding: 0.5rem 1rem;
              display: flex;
              justify-content: space-between;
            `}
          >
            <BiMenuAltLeft
              css={`
                font-size: var(--fontSizeXl);
              `}
            />

            <div
              css={`
                width: 1.5rem;
                height: 1.5rem;
                border-radius: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                background: var(--secondary4);
              `}
            >
              D
            </div>
          </nav>
          <Routes>
            <Route path="/" element={<TimerPage userInfo={props.userInfo} />} />
            <Route path="/login" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </div>
    </main>
  )
}

export default AuthenticatedApp
