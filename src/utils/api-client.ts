import { ZodType } from 'zod'
import { env, isProduction } from 'utils/env'

export type ClientConfig = {
  data?: unknown
  token?: string
  headers?: HeadersInit
} & RequestInit

export async function client<Response>(
  endpoint: string,
  responseSchema: ZodType<Response>,
  { data, headers: customHeaders, ...customConfig }: ClientConfig = {},
) {
  return fetch(`${env.REACT_APP_API_URL}/${endpoint}`, {
    method: data ? 'POST' : 'GET',
    body: data ? JSON.stringify(data) : undefined,
    headers: {
      'Content-Type': 'application/json',
      'X-Api-Key': env.REACT_APP_API_KEY || '',
      ...customHeaders,
    },
    ...customConfig,
  }).then(async res => {
    if (!res.ok) {
      return Promise.reject(res)
    }
    const data = await res.json()
    if (!isProduction()) {
      return responseSchema.parse(data)
    }
    responseSchema.safeParseAsync(data).then(result => {
      if (!result.success) {
        console.error(result.error.message)
      }
    })
    return data as Response
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
