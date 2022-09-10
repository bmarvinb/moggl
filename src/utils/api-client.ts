import { ZodType } from 'zod'

const API_URL = process.env.REACT_APP_API_URL
const API_KEY = process.env.REACT_APP_API_KEY

export type ClientConfig = {
  data?: unknown
  token?: string
  headers?: HeadersInit
} & RequestInit

export async function client(
  endpoint: string,
  { data, headers: customHeaders, ...customConfig }: ClientConfig = {},
) {
  return window
    .fetch(`${API_URL}/${endpoint}`, {
      method: data ? 'POST' : 'GET',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY || '',
        ...customHeaders,
      },
      ...customConfig,
    })
    .then(async res => {
      if (!res.ok) {
        return Promise.reject(res)
      }
      return res.json()
    })
}

export async function clientV2<Response>(
  endpoint: string,
  responseSchema: ZodType<Response>,
  { data, headers: customHeaders, ...customConfig }: ClientConfig = {},
) {
  return window
    .fetch(`${API_URL}/${endpoint}`, {
      method: data ? 'POST' : 'GET',
      body: data ? JSON.stringify(data) : undefined,
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': API_KEY || '',
        ...customHeaders,
      },
      ...customConfig,
    })
    .then(async res => {
      if (!res.ok) {
        return Promise.reject(res)
      }
      const data = await res.json()
      if (process.env.NODE_ENV === 'production') {
        responseSchema.safeParseAsync(data).then(result => {
          if (!result.success) {
            // Report error
            console.error(result.error.message)
          }
        })
        return data as Response
      }
      return responseSchema.parse(data)
    })
}
