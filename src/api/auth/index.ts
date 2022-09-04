import {client} from 'utils/api-client'
import {Session, User} from './types'

export function me(token: string): Promise<User> {
  return client('me', {token})
}

export function login(email: string, password: string): Promise<Session> {
  return client('me/sessions', {
    data: {remember_me: false},
    headers: {
      Authorization: `Basic ${btoa(`${email}:${password}`)}`,
    },
  })
}

export function logout(): Promise<void> {
  return Promise.resolve()
}
