import { pipe } from 'fp-ts/lib/function';
import { ZodType } from 'zod';

export function createURLSearchParams(
  options: Record<string, string | boolean | number>,
) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(options)) {
    params.append(key, value.toString());
  }
  return params;
}

export function URLSearchParamsData<T>(
  params: URLSearchParams,
  schema: ZodType<T>,
  fallback: T = {} as T,
): T {
  const data: Record<string, unknown> = {};
  for (const [key, value] of params.entries()) {
    data[key] = value;
  }
  return pipe(data, schema.safeParse, result =>
    result.success ? result.data : fallback,
  );
}
