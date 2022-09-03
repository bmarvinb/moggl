import { useState } from "react";
import { FormEvent } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/auth-context";

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("dmoisieiev@readdle.com");
  const [password, setPassword] = useState("SrkniwYRB23s2Z");

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    login(email, password, true).then(() => navigate("/"));
  };

  return (
    <div>
      <h1>Login</h1>

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
