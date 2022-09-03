import { Session, User } from "./types";

const BASE_URL = process.env.REACT_APP_API_URL;

export function me(token: string): Promise<User> {
  return fetch(`${BASE_URL}/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${token}:api_token`)}`,
    },
  })
    .then((resp) => resp.json())
    .catch((err) => console.error(err));
}

export function login(
  email: string,
  password: string,
  rememberMe: boolean
): Promise<Session> {
  return fetch(`${BASE_URL}/me/sessions`, {
    method: "POST",
    body: JSON.stringify({ remember_me: rememberMe }),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${email}:${password}`)}`,
    },
  })
    .then((resp) => resp.json())
    .catch((err) => console.error(err));
}

export function logout(): Promise<void> {
  return Promise.resolve();
}
