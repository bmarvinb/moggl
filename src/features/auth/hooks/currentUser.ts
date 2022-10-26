import { useUserInfo } from 'features/auth/context/auth-context';
import { User } from 'features/auth/services/user';

export function useCurrentUser(): User {
  const userInfo = useUserInfo();
  if (!userInfo) {
    throw new Error('Unauthorized user');
  }
  return userInfo.user;
}
