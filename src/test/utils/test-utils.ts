export function seconds({ hours = 0, minutes = 0, seconds = 0 }): number {
  return hours * 60 * 60 + minutes * 60 + seconds
}
