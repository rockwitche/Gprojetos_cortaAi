var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, timingSafeEqual } from 'crypto';
let GoogleAuthGuard = class GoogleAuthGuard extends AuthGuard('google') {
    jwt;
    constructor(jwt) {
        super();
        this.jwt = jwt;
    }
    async canActivate(context) {
        const req = context.switchToHttp().getRequest();
        const res = context.switchToHttp().getResponse();
        const callback = req.path.endsWith('/callback');
        const cookieOptions = {
            path: '/api/auth/google',
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            httpOnly: true,
        };
        try {
            if (callback) {
                const expected = req.cookies?.oauth_state;
                const actual = req.query.state;
                res.clearCookie('oauth_state', cookieOptions);
                if (typeof expected !== 'string' ||
                    typeof actual !== 'string' ||
                    Buffer.byteLength(expected) !== Buffer.byteLength(actual) ||
                    !timingSafeEqual(Buffer.from(expected), Buffer.from(actual))) {
                    throw new UnauthorizedException('Estado OAuth inválido.');
                }
                const payload = this.jwt.verify(actual);
                if (payload.purpose !== 'google-oauth' ||
                    !['CLIENTE', 'BARBEIRO'].includes(payload.tipo)) {
                    throw new UnauthorizedException('Estado OAuth inválido.');
                }
                req.googleAuth = {
                    tipo: payload.tipo,
                    rememberMe: payload.rememberMe === true,
                };
            }
            else {
                const tipo = req.query.tipo ?? 'CLIENTE';
                if (tipo !== 'CLIENTE' && tipo !== 'BARBEIRO') {
                    throw new UnauthorizedException('Tipo de conta inválido.');
                }
                req.googleState = this.jwt.sign({
                    purpose: 'google-oauth',
                    tipo,
                    rememberMe: req.query.rememberMe === 'true',
                    nonce: randomBytes(24).toString('hex'),
                }, { expiresIn: '10m' });
                res.cookie('oauth_state', req.googleState, {
                    ...cookieOptions,
                    maxAge: 10 * 60_000,
                });
            }
            return (await super.canActivate(context));
        }
        catch {
            const frontend = (process.env.FRONTEND_URL ?? 'http://localhost:4200').replace(/\/$/, '');
            const error = callback && req.query.error === 'access_denied'
                ? 'cancelled'
                : 'failed';
            res.redirect(`${frontend}/login?oauthError=${error}`);
            return false;
        }
    }
    getAuthenticateOptions(context) {
        const req = context.switchToHttp().getRequest();
        return {
            session: false,
            ...(req.googleState ? { state: req.googleState } : {}),
        };
    }
};
GoogleAuthGuard = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [JwtService])
], GoogleAuthGuard);
export { GoogleAuthGuard };
//# sourceMappingURL=google-auth.guard.js.map