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
    .catch(console.error)
}
