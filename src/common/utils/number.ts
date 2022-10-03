export function numberPad(number: number, padding = 1): string {
  return number < 10 ? `${'0'.repeat(padding)}${number}` : `${number}`;
}

export function calculatePercentage(max: number, n: number): number {
  return (n / max) * 100;
}
