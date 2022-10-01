import { useMachine } from '@xstate/react'
import { UserInfo } from 'auth/context/auth-context'
import { Box, Drawer, DrawerContent } from 'components'
import { Nav } from 'components/Nav'
import { drawerMachine } from 'machines/drawerMachine'
import { TimerPage } from 'pages/TimerPage'
import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export type AuthenticatedAppProps = {
  userInfo: UserInfo
}

export const AuthenticatedApp: FC<AuthenticatedAppProps> = props => {
  const [state, send] = useMachine(drawerMachine)
  return (
    <Box
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
        <Drawer
          onOpenChange={() => send('TOGGLE.DRAWER')}
          open={state.matches('expanded')}
        >
          <DrawerContent>
            <select>
              <option>Workspace 1</option>
              <option>Workspace 2</option>
            </select>
          </DrawerContent>
        </Drawer>

        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          <Nav onMenuClicked={() => send('TOGGLE.DRAWER')} />
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
