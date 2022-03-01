import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (info instanceof Error && 'jwt expired' === info.message) {
      throw new UnauthorizedException(info.message);
    }

    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
