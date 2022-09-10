import { ZodType } from 'zod'

export function parseResult(schema: ZodType) {
  return (data: unknown) => {
    const output = schema.safeParse(data)
    if (output.success) {
      return output.data
    }
    console.error(output.error.message)
    throw new Error(output.error.message)
  }
}
