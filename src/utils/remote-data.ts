export const enum RemoteDataStatus {
  Idle = 'Idle',
  Loading = 'Loading',
  Success = 'Success',
  Error = 'Error',
}

type Idle = {status: RemoteDataStatus.Idle}
type Loading = {status: RemoteDataStatus.Loading}
type Success<T> = {status: RemoteDataStatus.Success; data: T}
type Error<T> = {status: RemoteDataStatus.Error; error: T}

export type RemoteData<T = void, E = unknown> =
  | Idle
  | Loading
  | Success<T>
  | Error<E>

export function idle() {
  return {status: RemoteDataStatus.Idle} as const
}

export function loading() {
  return {status: RemoteDataStatus.Loading} as const
}

export function success<T>(data: T) {
  return {status: RemoteDataStatus.Success, data} as const
}

export function error<T = unknown>(error: T) {
  return {status: RemoteDataStatus.Error, error} as const
}

export function isIdle<T>(remoteData: RemoteData<T>): remoteData is Idle {
  return remoteData.status === RemoteDataStatus.Idle
}

export function isLoading<T>(remoteData: RemoteData<T>): remoteData is Loading {
  return remoteData.status === RemoteDataStatus.Loading
}

export function isSuccess<T>(
  remoteData: RemoteData<T>,
): remoteData is Success<T> {
  return remoteData.status === RemoteDataStatus.Success
}

export function isError<T>(remoteData: RemoteData<T>): remoteData is Error<T> {
  return remoteData.status === RemoteDataStatus.Error
}
