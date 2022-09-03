import { Link } from "react-router-dom";

export function HomePage() {
  return (
    <div>
      <div>
        <Link to="/login">Login</Link>
      </div>
      <div>
        <Link to="/register">Register</Link>
      </div>
    </div>
  );
}
