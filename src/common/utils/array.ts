export function sample<T>(xs: T[]): T {
  return xs[Math.floor(Math.random() * xs.length)];
}
