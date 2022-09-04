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
  openid_email?: any
  openid_enabled: boolean
  country_id: number
  at: Date
  intercom_hash: string
  has_password: boolean
}
