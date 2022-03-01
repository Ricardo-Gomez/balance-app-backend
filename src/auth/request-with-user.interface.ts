import { Request } from 'express';
import { User } from '../data/users/user.schema';

export interface RequestWithUser extends Request {
  user: User;
}
