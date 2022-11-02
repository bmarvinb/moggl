export function cn(
  ...classes: (string | boolean | undefined | null)[]
): string {
  return classes.filter(arg => arg).join(' ');
}
