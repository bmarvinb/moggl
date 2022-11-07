import { useMachine } from '@xstate/react';
import { Drawer } from 'common/components/Elements/Drawer';
import { useCurrentUser } from 'features/auth';
import { Navbar } from 'common/components/Navbar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuUserProfile,
  Profile,
} from 'common/components/Navigation';
import { drawerMachine } from 'common/components/Elements/Drawer/drawerMachine';
import { ClientsPage } from 'pages/ClientsPage';
import { ProjectsPage } from 'pages/ProjectsPage';
import { TagsPage } from 'pages/TagsPage';
import { TimerPage } from 'pages/TimerPage';
import { BiFolder, BiGroup, BiTag, BiTimer } from 'react-icons/bi';
import { Navigate, Route, Routes } from 'react-router-dom';

const menuItems: NavigationMenuItem[] = [
  {
    route: '',
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
  const temporaryMode = state.context.mode === 'temporary';
  const open = state.matches('open');
  const profileInfo: Profile = {
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
              <NavigationMenu
                items={menuItems}
                open={open}
                onMenuItemClicked={() => send('CLOSE')}
              />
              <NavigationMenuUserProfile
                open={open}
                data={profileInfo}
              ></NavigationMenuUserProfile>
            </>
          </Drawer>
        )}
        <main className="flex max-h-screen flex-1 flex-col overflow-y-scroll">
          {temporaryMode && <Navbar onMenuClicked={() => send('TOGGLE')} />}
          <Routes>
            <Route path="/" element={<TimerPage />} />
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
