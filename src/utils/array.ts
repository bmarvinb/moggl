export function uniq<T>(xs: T[]): T[] {
  console.log(xs)

  return [...new Set(xs)]
}
