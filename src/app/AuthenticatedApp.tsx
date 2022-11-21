import { Drawer, useDrawer } from 'common/components/Drawer';
import { Navbar } from 'common/components/Navbar';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuUserProfile,
  Profile,
} from 'common/components/Navigation';
import { useCurrentUser } from 'features/auth';
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
  const [state, action] = useDrawer();
  const temporaryMode = state.mode === 'temporary';
  const currentUser = useCurrentUser();
  const profileInfo: Profile = {
    email: currentUser.email,
    name: currentUser.name,
    profilePicture: currentUser.profilePicture,
  };

  return (
    <div className="m-auto flex h-full max-w-[160rem] flex-col bg-neutral-100 shadow-md dark:bg-neutral-dark-50">
      <div className="flex h-full">
        {state.mode && (
          <Drawer
            variant={temporaryMode ? 'temporary' : 'permanent'}
            onOpenChange={action.toggle}
            open={state.open}
          >
            <>
              <NavigationMenu
                items={menuItems}
                open={state.open}
                onMenuItemClicked={action.close}
              />
              <NavigationMenuUserProfile
                open={state.open}
                data={profileInfo}
              ></NavigationMenuUserProfile>
            </>
          </Drawer>
        )}
        <main className="flex max-h-screen flex-1 flex-col overflow-y-scroll">
          {temporaryMode && <Navbar onMenuClicked={action.toggle} />}
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
