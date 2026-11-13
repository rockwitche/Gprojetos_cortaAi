import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import type { Request } from 'express';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<Request>();
    const cookie = request.headers.cookie ?? '';
    const authorization = request.headers.authorization ?? '';
    const hasAccessToken = /(?:^|;\s*)access_token=/.test(cookie);
    const hasBearerToken = /^Bearer\s+\S+$/i.test(authorization);
    const hasVerificationToken =
      typeof request.body?.verificationToken === 'string';

    if (!hasAccessToken && !hasBearerToken && !hasVerificationToken) {
      return true;
    }
    return super.canActivate(context);
  }
}
