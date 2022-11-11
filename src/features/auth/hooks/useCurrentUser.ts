import { useUserInfo } from '../providers/auth-provider';
import { User } from '../services/user';

export function useCurrentUser(): User {
  const userInfo = useUserInfo();
  if (!userInfo) {
    throw new Error('Unauthorized user');
  }
  return userInfo.user;
}
