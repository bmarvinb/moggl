import { useMachine } from '@xstate/react';
import { Menu, MenuItem } from 'shared/components/Menu';
import { ProfileInfo, ProfileInfoData } from 'shared/components/ProfileInfo';
import { Drawer } from 'layout/Drawer';
import { Navbar } from 'layout/Navbar';
import {
  drawerMachine,
  DrawerMode,
  DrawerState,
} from 'layout/machines/drawerMachine';
import { useCurrentUser } from 'features/auth/hooks/currentUser';
import { ClientsPage } from 'pages/ClientsPage';
import { ProjectsPage } from 'pages/ProjectsPage';
import { TagsPage } from 'pages/TagsPage';
import { TimerPage } from 'pages/TimerPage';
import { BiFolder, BiGroup, BiTag, BiTimer } from 'react-icons/bi';
import { Navigate, Route, Routes } from 'react-router-dom';

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

export const AuthenticatedApp = () => {
  const [state, send] = useMachine(drawerMachine);
  const currentUser = useCurrentUser();
  const temporaryMode = state.context.mode === DrawerMode.Temporary;
  const open = state.matches(DrawerState.Open);
  const profileInfo: ProfileInfoData = {
    email: currentUser.email,
    name: currentUser.name,
    profilePicture: currentUser.profilePicture,
  };

  return (
    <div className="flex h-full flex-col bg-neutral-100">
      <div className="flex h-full">
        {state.context.mode && (
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
        )}
        <main className="flex max-h-screen flex-1 flex-col overflow-y-scroll">
          {temporaryMode && <Navbar onMenuClicked={() => send('TOGGLE')} />}
          <Routes>
            <Route path="/timer" element={<TimerPage />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/clients" element={<ClientsPage />} />
            <Route path="/tags" element={<TagsPage />} />
            <Route path="/login" element={<Navigate replace to="/" />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AuthenticatedApp;
