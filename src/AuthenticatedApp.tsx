import { useMachine } from '@xstate/react'
import { UserInfo } from 'auth/context/auth-context'
import { Button, Box, Sidebar } from 'components'
import { Nav } from 'components/nav'
import { sidebarMachine } from 'machines/sidebarMachine'
import { TimerPage } from 'pages/TimerPage'
import { FC, useReducer } from 'react'
import { BiMenuAltLeft, BiMoon, BiSun } from 'react-icons/bi'
import { Navigate, Route, Routes } from 'react-router-dom'
import { darkTheme } from 'theme/config'

export type AuthenticatedAppProps = {
  userInfo: UserInfo
}

export const AuthenticatedApp: FC<AuthenticatedAppProps> = props => {
  const [state, send] = useMachine(sidebarMachine)
  const [darkMode, toggleDarkMode] = useReducer(darkMode => !darkMode, false)
  return (
    <Box
      className={darkMode ? darkTheme : ''}
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
          <Nav darkMode={darkMode} onToggleDarkMode={toggleDarkMode} />
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
