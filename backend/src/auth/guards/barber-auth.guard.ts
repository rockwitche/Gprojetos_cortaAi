import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class BarberAuthGuard extends AuthGuard('jwt') {
  handleRequest<TUser = any>(
    err: any,
    user: { tipo?: string } | undefined,
    _info: any,
    _context: ExecutionContext,
    _status?: any,
  ): TUser {
    if (err || !user) {
      throw err ?? new UnauthorizedException();
    }
    if (user.tipo !== 'BARBEIRO') {
      throw new ForbiddenException('Acesso restrito a contas de barbeiro.');
    }
    return user as TUser;
  }
}
