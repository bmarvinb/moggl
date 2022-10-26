export function createURLSearchParams(
  options: Record<string, string | boolean | number>,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(options)) {
    params.append(key, value.toString());
  }
  return params;
}
