export function assertNever(x: never): never {
  throw new Error('Invalid state')
}