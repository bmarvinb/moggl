import { useAuth } from "./context/auth-context";

function AuthenticatedApp() {
  const { logout } = useAuth();

  return (
    <div>
      <div>
        <button onClick={() => logout()}>Logout</button>
      </div>
    </div>
  );
}

export default AuthenticatedApp;
