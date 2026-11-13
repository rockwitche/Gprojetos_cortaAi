var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-google-oauth20';
import { ConfigService } from '@nestjs/config';
let GoogleStrategy = class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
    constructor(configService) {
        super({
            clientID: configService.get('GOOGLE_CLIENT_ID'),
            clientSecret: configService.get('GOOGLE_CLIENT_SECRET'),
            callbackURL: configService.get('GOOGLE_CALLBACK_URL'),
            scope: ['email', 'profile'],
        });
    }
    async validate(_accessToken, _refreshToken, profile, done) {
        const { id, emails, displayName, photos } = profile;
        if (!emails || emails.length === 0) {
            return done(new UnauthorizedException('E-mail não disponível no perfil Google.'), false);
        }
        const user = {
            googleId: id,
            email: emails[0].value,
            nome: displayName,
            avatar: photos?.[0]?.value ?? null,
        };
        done(null, user);
    }
};
GoogleStrategy = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [ConfigService])
], GoogleStrategy);
export { GoogleStrategy };
//# sourceMappingURL=google.strategy.js.map