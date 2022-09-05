import * as auth from 'services/auth'

const BASE_URL = process.env.REACT_APP_API_URL

export type ClientConfig = {
  data?: unknown
  token?: string
  headers?: HeadersInit
} & RequestInit

export async function client(
  endpoint: string,
  {data, token, headers: customHeaders, ...customConfig}: ClientConfig = {},
) {
  return window
    .fetch(`${BASE_URL}/${endpoint}`, {
      method: data ? 'POST' : 'GET',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Basic ${btoa(`${token}:api_token`)}` : '',
        ...customHeaders,
      },
      ...customConfig,
    })
    .then(async res => {
      if (res.status === 401) {
        await auth.logout()
        window.location.assign('/login')
        return Promise.reject()
      }

      if (!res.ok) {
        return Promise.reject(res)
      }

      return res.json()
    })
}
