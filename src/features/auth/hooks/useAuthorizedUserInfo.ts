import { UserInfo, useUserInfo } from 'features/auth/context/auth-context';
import { isNone } from 'fp-ts/lib/Option';

export function useAuthorizedUserInfo(): UserInfo {
  const userInfo = useUserInfo();
  if (isNone(userInfo)) {
    // TODO: show notification, logout user, redirect to login with current url
    throw new Error('Unauthorized user');
  }
  return userInfo.value;
}
