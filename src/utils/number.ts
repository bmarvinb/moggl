export function numberPad(number: number): string {
  return number < 10 ? `0${number}` : `${number}`
}
