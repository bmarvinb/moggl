import { z } from 'zod'

export const isProduction = () => process.env.NODE_ENV === 'production'

const envSchema = z.object({
  REACT_APP_API_URL: z.string().min(1),
  REACT_APP_API_KEY: z.string().min(1),
})

export const env = envSchema.parse(process.env)
