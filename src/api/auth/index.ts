import {client} from 'utils/api-client'
import {removeApiToken, setApiToken} from 'utils/api-key-storage'
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
  }).then(session => {
    setApiToken(session.api_token)
    return session
  })
}

export function logout(): Promise<void> {
  removeApiToken()
  return Promise.resolve()
}
