import { useMachine } from '@xstate/react'
import { UserInfo } from 'auth/context/auth-context'
import { Button, Box, Sidebar } from 'components'
import { sidebarMachine } from 'machines/sidebarMachine'
import { TimerPage } from 'pages/TimerPage'
import { FC } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Navigate, Route, Routes } from 'react-router-dom'

export type AuthenticatedAppProps = {
  userInfo: UserInfo
}

export const AuthenticatedApp: FC<AuthenticatedAppProps> = props => {
  const [state, send] = useMachine(sidebarMachine)
  return (
    <Box
      as="main"
      css={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      <Box
        css={{
          display: 'flex',
        }}
      >
        <Sidebar
          expanded={state.matches('expanded')}
          onModeChanged={() => send('TOGGLE.SIDEBAR')}
        ></Sidebar>

        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Box
            as="nav"
            css={{
              background: '$primary4',
              color: '$neutral0',
              padding: '0rem $1',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 1,
              minHeight: '3rem',
            }}
          >
            <Button use="icon" size="xl" onClick={() => send('TOGGLE.SIDEBAR')}>
              <BiMenuAltLeft />
            </Button>
          </Box>
          <Routes>
            <Route path="/" element={<TimerPage userInfo={props.userInfo} />} />
            <Route path="/login" element={<Navigate replace to="/" />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  )
}

export default AuthenticatedApp
