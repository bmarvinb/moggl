import { useMachine } from '@xstate/react';
import { Box } from 'common/components/Box';
import { Menu, MenuItem } from 'common/components/Menu';
import { ProfileInfo, ProfileInfoData } from 'common/components/ProfileInfo';
import { Drawer } from 'core/layout/Drawer';
import { Navbar } from 'core/layout/Navbar';
import { drawerMachine, DrawerMode } from 'core/machines/drawerMachine';
import { UserInfo } from 'features/auth/context/auth-context';
import { ClientsPage } from 'pages/ClientsPage';
import { ProjectsPage } from 'pages/ProjectsPage';
import { TagsPage } from 'pages/TagsPage';
import { TimerPage } from 'pages/TimerPage';
import { FC } from 'react';
import { BiFolder, BiGroup, BiTag, BiTimer } from 'react-icons/bi';
import { Navigate, Route, Routes } from 'react-router-dom';

export type AuthenticatedAppProps = {
  userInfo: UserInfo;
};

const menuItems: MenuItem[] = [
  {
    route: 'timer',
    title: 'Timer',
    icon: <BiTimer />,
  },
  {
    route: 'projects',
    title: 'Projects',
    icon: <BiFolder />,
  },
  {
    route: 'clients',
    title: 'Clients',
    icon: <BiGroup />,
  },
  {
    route: 'tags',
    title: 'Tags',
    icon: <BiTag />,
  },
];

export const AuthenticatedApp: FC<AuthenticatedAppProps> = props => {
  const [state, send] = useMachine(drawerMachine);
  const temporaryMode = state.context.mode === DrawerMode.Temporary;
  const open = state.matches('open');
  const profileInfo: ProfileInfoData = {
    email: props.userInfo.user.email,
    name: props.userInfo.user.name,
    profilePicture: props.userInfo.user.profilePicture,
  };

  return (
    <Box
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
          <>
            <Menu
              items={menuItems}
              open={open}
              onMenuItemClicked={() => send('CLOSE')}
            />
            <ProfileInfo open={open} profileInfo={profileInfo}></ProfileInfo>
          </>
        </Drawer>

        <Box
          as="main"
          css={{
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            maxHeight: '100vh',
            overflowY: 'scroll',
          }}
        >
          {temporaryMode && <Navbar onMenuClicked={() => send('TOGGLE')} />}
          <Routes>
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/login" element={<Navigate replace to="/" />} />
          </Routes>
        </Box>
      </Box>
    </Box>
  );
};

export default AuthenticatedApp;
