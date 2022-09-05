import {client, setApiToken, removeApiToken} from 'utils'

export type Session = {
  api_token: string
  email: string
  fullname: string
  id: number
  timezone: string
}

export type User = {
  id: number
  api_token: string
  email: string
  fullname: string
  timezone: string
  default_workspace_id: number
  beginning_of_week: number
  image_url: string
  created_at: Date
  updated_at: Date
  openid_email?: number
  openid_enabled: boolean
  country_id: number
  at: Date
  intercom_hash: string
  has_password: boolean
}

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
