import { useMachine } from '@xstate/react';
import { Box } from 'common/components/Box';
import { Drawer } from 'common/components/Drawer';
import { Navbar } from 'common/components/Navbar';
import { drawerMachine, DrawerMode } from 'core/machines/drawerMachine';
import { UserInfo } from 'features/auth/context/auth-context';
import { TimerPage } from 'pages/TimerPage';
import { FC } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

export type AuthenticatedAppProps = {
  userInfo: UserInfo;
};

export const AuthenticatedApp: FC<AuthenticatedAppProps> = props => {
  const [state, send] = useMachine(drawerMachine);
  const temporaryMode = state.context.mode === DrawerMode.Temporary;
  const open = state.matches('open');
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
            onOpenChange={() => send('TOGGLE')}
            open={open}
          ></Drawer>
        ) : (
          <Drawer
            variant="permanent"
            onOpenChange={() => send('TOGGLE')}
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
          {temporaryMode && <Navbar onMenuClicked={() => send('TOGGLE')} />}
          <Routes>
            <Route path="/" element={<TimerPage userInfo={props.userInfo} />} />
            <Route path="/login" element={<Navigate replace to="/" />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthenticatedApp;
