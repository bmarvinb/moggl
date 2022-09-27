import { useMachine } from '@xstate/react'
import { UserInfo } from 'auth/context/auth-context'
import { IconButton } from 'components/IconButton'
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
        <Sidebar
          expanded={state.matches('expanded')}
          onModeChanged={() => send('TOGGLE.SIDEBAR')}
        ></Sidebar>

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
              height: 2.5rem;
              display: flex;
              justify-content: space-between;
              z-index: 1;
            `}
          >
            <IconButton
              onClick={() => send('TOGGLE.SIDEBAR')}
              css={`
                color: var(--neutral0);
                &:hover {
                  color: var(--neutral2);
                }
                &:active {
                  color: var(--neutral3);
                }
              `}
            >
              <BiMenuAltLeft
                css={`
                  font-size: var(--fontSizeXl);
                `}
              />
            </IconButton>
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
