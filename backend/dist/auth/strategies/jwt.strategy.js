var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../prisma/prisma.service.js';
let JwtStrategy = class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    prisma;
    constructor(configService, prisma) {
        const secret = configService.get('JWT_SECRET');
        if (!secret || secret.length < 32) {
            throw new Error('Configure JWT_SECRET com pelo menos 32 caracteres aleatórios.');
        }
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req) => {
                    try {
                        if (!req || !req.headers)
                            return null;
                        const cookie = req.headers.cookie;
                        if (!cookie)
                            return null;
                        const match = cookie.match(/(?:^|;\s*)access_token=([^;]+)/);
                        return match ? decodeURIComponent(match[1]) : null;
                    }
                    catch {
                        return null;
                    }
                },
                ExtractJwt.fromAuthHeaderAsBearerToken(),
                (req) => {
                    if (req?.body && typeof req.body.verificationToken === 'string') {
                        return req.body.verificationToken;
                    }
                    return null;
                },
            ]),
            ignoreExpiration: false,
            secretOrKey: secret,
        });
        this.prisma = prisma;
    }
    async validate(payload) {
        const user = await this.prisma.user.findUnique({
            where: { id: payload.sub },
            select: { id: true, authVersion: true, emailVerified: true, tipo: true },
        });
        if (!user || user.authVersion !== payload.ver) {
            return null;
        }
        return {
            id: payload.sub,
            email: payload.email,
            ver: payload.ver,
            tipo: user.tipo,
        };
    }
};
JwtStrategy = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService,
        PrismaService])
], JwtStrategy);
export { JwtStrategy };
//# sourceMappingURL=jwt.strategy.js.map