import { useMachine } from '@xstate/react'
import { UserInfo } from 'auth/context/auth-context'
import { Sidebar } from 'components/Sidebar'
import { sidebarMachine } from 'machines/sidebarMachine'
import { TimerPage } from 'pages/TimerPage'
import { FC } from 'react'
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
      `}
    >
      <nav
        css={`
          background: var(--primary8);
          color: var(--neutral0);
          padding: 1rem;
        `}
      >
        Nav
      </nav>
      <section
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
            flex: 1;
          `}
        >
          <Routes>
            <Route path="/" element={<TimerPage userInfo={props.userInfo} />} />
            <Route path="/login" element={<Navigate replace to="/" />} />
          </Routes>
        </div>
      </section>
    </main>
  )
}

export default AuthenticatedApp
