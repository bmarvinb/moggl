import { useMachine } from '@xstate/react'
import { UserInfo } from 'auth/context/auth-context'
import { Button, Box, Sidebar } from 'components'
import { sidebarMachine } from 'machines/sidebarMachine'
import { TimerPage } from 'pages/TimerPage'
import { FC } from 'react'
import { BiMenuAltLeft } from 'react-icons/bi'
import { Navigate, Route, Routes } from 'react-router-dom'
import { darkTheme } from 'theme/config'

export type AuthenticatedAppProps = {
  userInfo: UserInfo
}

export const AuthenticatedApp: FC<AuthenticatedAppProps> = props => {
  const [state, send] = useMachine(sidebarMachine)
  return (
    <Box
      className={darkTheme}
      as="main"
      css={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        background: '$neutral1',
      }}
    >
      <Box
        css={{
          display: 'flex',
          height: '100%',
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
              background: '$primary5',
              color: '$neutral1',
              padding: '$2 $4',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              zIndex: 1,
              minHeight: '3rem',
            }}
          >
            <Button
              variant="icon"
              size="lg"
              onClick={() => send('TOGGLE.SIDEBAR')}
            >
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
