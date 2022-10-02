import { useMachine } from '@xstate/react'
import { UserInfo } from 'features/auth/context/auth-context'
import { Box, Drawer, Navigation } from 'components'
import { drawerMachine, DrawerMode } from 'core/machines/drawerMachine'
import { TimerPage } from 'pages/TimerPage'
import { FC } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

export type AuthenticatedAppProps = {
  userInfo: UserInfo
}

export const AuthenticatedApp: FC<AuthenticatedAppProps> = props => {
  const [state, send] = useMachine(drawerMachine)
  const temporaryMode = state.context.mode === DrawerMode.Temporary
  const open = state.matches('open')
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
        {temporaryMode ? (
          <Drawer
            variant="temporary"
            onOpenChange={() => send('TOGGLE.DRAWER')}
            open={open}
          ></Drawer>
        ) : (
          <Drawer
            variant="permanent"
            onOpenChange={() => send('TOGGLE.DRAWER')}
            open={open}
          ></Drawer>
        )}

        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          {temporaryMode && (
            <Navigation onMenuClicked={() => send('TOGGLE.DRAWER')} />
          )}
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
