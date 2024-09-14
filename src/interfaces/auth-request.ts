import { User } from '../modules/user';

export interface AuthRequest extends Request {
  user?: User;
}
