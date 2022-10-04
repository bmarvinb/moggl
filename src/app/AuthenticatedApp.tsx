import { useMachine } from '@xstate/react';
import { Box } from 'common/components/Box';
import { Menu } from 'common/components/Menu';
import { Drawer } from 'core/layout/Drawer';
import { Navbar } from 'core/layout/Navbar';
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
        <Drawer
          variant={temporaryMode ? 'temporary' : 'permanent'}
          onOpenChange={() => send('TOGGLE')}
          open={open}
        >
          <Menu
            open={open}
            avatarImageSource={props.userInfo.user.profilePicture}
            username={props.userInfo.user.name}
            email={props.userInfo.user.email}
          />
        </Drawer>
        <Box
          css={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
          }}
        >
          {temporaryMode && <Navbar onMenuClicked={() => send('TOGGLE')} />}
          <Routes>
            <Route
              path="/timer"
              element={<TimerPage userInfo={props.userInfo} />}
            />
            <Route path="/login" element={<Navigate replace to="/" />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthenticatedApp;
