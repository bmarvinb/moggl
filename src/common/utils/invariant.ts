import { isProduction } from 'common/utils/env'

const defaultMessage = 'Invariant failed'

export function invariant(
  condition: unknown,
  message = defaultMessage,
): asserts condition {
  if (condition) {
    return
  }
  new Error(isProduction() ? defaultMessage : message)
}
