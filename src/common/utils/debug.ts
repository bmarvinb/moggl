export function debug<T>(name: string) {
  return (value: T): T => {
    console.log(name, value)
    return value
  }
}
