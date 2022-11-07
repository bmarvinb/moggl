import { useUserInfo } from '../context/auth-context';
import { User } from '../services/user';

export function useCurrentUser(): User {
  const userInfo = useUserInfo();
  if (!userInfo) {
    throw new Error('Unauthorized user');
  }
  return userInfo.user;
}
