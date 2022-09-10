import { isProduction } from 'utils/env'
import { ZodType } from 'zod'

const API_URL = process.env.REACT_APP_API_URL
const API_KEY = process.env.REACT_APP_API_KEY

export type ClientConfig = {
  data?: unknown
  token?: string
  headers?: HeadersInit
} & RequestInit

export type SchemaValidators<Request, Response> = {
  requestSchema: ZodType<Request>
  responseSchema: ZodType<Response>
}

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

export async function clientV2<Request, Response>(
  endpoint: string,
  { requestSchema, responseSchema }: SchemaValidators<Request, Response>,
  { data, headers: customHeaders, ...customConfig }: ClientConfig = {},
) {
  requestSchema.parse(data)
  return fetch(`${API_URL}/${endpoint}`, {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': API_KEY || '',
      ...customHeaders,
    },
    ...customConfig,
  }).then(async res => {
    if (!res.ok) {
      return Promise.reject(res)
    }
    const data = await res.json()
    if (isProduction()) {
      responseSchema.safeParseAsync(data).then(result => {
        if (!result.success) {
          console.error(result.error.message)
        }
      })
      return data as Response
    }
    return responseSchema.parse(data)
  })
}

export function createURLSearchParams(options: {
  [key: string]: string | boolean | number
}) {
  const params = new URLSearchParams()
  for (const [key, value] of Object.entries(options)) {
    params.append(key, value.toString())
  }
  return params
}
