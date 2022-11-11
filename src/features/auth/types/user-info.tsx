import { User } from '../services/user';
import { Workspace } from '../services/workspace';

export type UserInfo = {
  user: User;
  workspaces: Workspace[];
};
