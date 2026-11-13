var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, UnauthorizedException, ConflictException, BadRequestException, ServiceUnavailableException, } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { createHash, createHmac, randomBytes, randomInt } from 'crypto';
import { PrismaService } from '../prisma/prisma.service.js';
import { EmailService } from './email.service.js';
let AuthService = class AuthService {
    prisma;
    jwtService;
    emailService;
    configService;
    constructor(prisma, jwtService, emailService, configService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
        this.configService = configService;
    }
    normalizeEmail(email) {
        if (typeof email !== 'string' || email.length > 254)
            throw new BadRequestException('E-mail inválido.');
        return email.trim().toLowerCase();
    }
    async checkEmailExists(email) {
        if (!email || typeof email !== 'string' || email.trim().length === 0 || email.length > 254) {
            return { exists: false, valid: false, reason: 'E-mail inválido.' };
        }
        const normalized = email.trim().toLowerCase();
        const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized);
        if (!valid)
            return { exists: false, valid: false, reason: 'E-mail inválido.' };
        const user = await this.prisma.user.findUnique({ where: { email: normalized } });
        return {
            exists: !!user,
            valid: true,
            reason: user ? 'Este e-mail já está cadastrado.' : null,
        };
    }
    async getMe(userId) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                tipo: true,
                plano: true,
                avatar: true,
                emailVerified: true,
            },
        });
        if (!user) {
            throw new UnauthorizedException('Usuário não encontrado.');
        }
        return user;
    }
    validatePassword(password) {
        if (typeof password !== 'string' ||
            password.length < 8 ||
            Buffer.byteLength(password, 'utf8') > 72)
            throw new BadRequestException('Use pelo menos 8 caracteres e no máximo 72 bytes na senha.');
    }
    secret() {
        const secret = this.configService.get('JWT_SECRET');
        if (!secret || secret.length < 32)
            throw new ServiceUnavailableException('Autenticação indisponível.');
        return secret;
    }
    otpHash(email, nonce, code) {
        return createHmac('sha256', this.secret())
            .update('verify:' + email + ':' + nonce + ':' + code)
            .digest('hex');
    }
    generateJwt(user) {
        const payload = {
            sub: user.id,
            email: user.email,
            ver: user.authVersion,
        };
        return this.jwtService.sign(payload);
    }
    async register(dto) {
        const email = this.normalizeEmail(dto.email);
        this.validatePassword(dto.senha);
        const existing = await this.prisma.user.findUnique({ where: { email } });
        if (existing)
            throw new ConflictException('E-mail já cadastrado.');
        const hashedPassword = await bcrypt.hash(dto.senha, 12);
        const user = await this.prisma.user.create({
            data: {
                nome: dto.nome,
                email,
                senha: hashedPassword,
                telefone: dto.telefone,
                tipo: dto.tipo ?? 'CLIENTE',
                emailVerified: false,
            },
        });
        await this.sendChallenge(user);
        const verificationToken = this.generateJwt(user);
        return {
            message: 'Conta criada! Verifique seu e-mail para ativar a conta.',
            email: user.email,
            verificationToken,
            requiresVerification: true,
        };
    }
    async login(dto) {
        const email = this.normalizeEmail(dto.email);
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || !user.senha) {
            await bcrypt.compare(dto.senha, '$2b$12$placeholder.salt.for.timing.safety');
            throw new UnauthorizedException('E-mail ou senha incorretos.');
        }
        const passwordMatch = await bcrypt.compare(dto.senha, user.senha);
        if (!passwordMatch) {
            throw new UnauthorizedException('E-mail ou senha incorretos.');
        }
        if (!user.emailVerified) {
            await this.sendChallenge(user);
            const verificationToken = this.generateJwt(user);
            return {
                requiresVerification: true,
                email: user.email,
                verificationToken,
                message: 'Verifique seu e-mail antes de entrar. Um novo código foi enviado.',
            };
        }
        const token = this.generateJwt(user);
        const userPayload = {
            id: user.id,
            nome: user.nome,
            email: user.email,
            telefone: user.telefone,
            tipo: user.tipo,
            plano: user.plano,
            avatar: user.avatar,
        };
        return { access_token: token, user: userPayload, rememberMe: dto.rememberMe };
    }
    async sendChallenge(user) {
        const code = String(randomInt(100000, 1000000));
        const nonce = randomBytes(24).toString('hex');
        const changed = await this.prisma.user.updateMany({
            where: { id: user.id, emailVerified: false, senha: user.senha },
            data: {
                verificationCode: nonce + ':' + this.otpHash(user.email, nonce, code),
                verificationAttempts: 0,
                verificationExpires: new Date(Date.now() + 15 * 60_000),
            },
        });
        if (!changed.count)
            throw new BadRequestException('Faça login para continuar.');
        const sent = await this.emailService.sendVerificationCode(user.email, code, user.nome);
        if (!sent)
            throw new ServiceUnavailableException('Não foi possível enviar o código. Tente novamente em instantes.');
        return { message: 'Código enviado para ' + user.email };
    }
    async verifyEmail(userId, dto) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user)
            throw new UnauthorizedException('Usuário não encontrado.');
        if (user.emailVerified)
            return { message: 'E-mail já verificado.' };
        if (!user.verificationCode ||
            !user.verificationExpires ||
            user.verificationExpires < new Date()) {
            throw new BadRequestException('Código expirado. Solicite um novo.');
        }
        const MAX_ATTEMPTS = 5;
        if (user.verificationAttempts >= MAX_ATTEMPTS) {
            throw new BadRequestException('Muitas tentativas. Solicite um novo código.');
        }
        const [nonce, storedHash] = user.verificationCode.split(':');
        const expectedHash = this.otpHash(user.email, nonce, dto.code);
        const isValid = storedHash?.length === expectedHash.length &&
            (() => {
                try {
                    const { timingSafeEqual } = require('crypto');
                    return timingSafeEqual(Buffer.from(storedHash, 'hex'), Buffer.from(expectedHash, 'hex'));
                }
                catch {
                    return false;
                }
            })();
        if (!isValid) {
            await this.prisma.user.update({
                where: { id: user.id },
                data: { verificationAttempts: { increment: 1 } },
            });
            throw new BadRequestException('Código incorreto.');
        }
        const updatedUser = await this.prisma.user.update({
            where: { id: user.id },
            data: {
                emailVerified: true,
                verificationCode: null,
                verificationExpires: null,
                verificationAttempts: 0,
            },
        });
        const token = this.generateJwt(updatedUser);
        const userPayload = {
            id: updatedUser.id,
            nome: updatedUser.nome,
            email: updatedUser.email,
            telefone: updatedUser.telefone,
            tipo: updatedUser.tipo,
            plano: updatedUser.plano,
            avatar: updatedUser.avatar,
        };
        return { access_token: token, user: userPayload, message: 'E-mail verificado com sucesso!' };
    }
    async resendCode(dto) {
        const email = this.normalizeEmail(dto.email);
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user || user.emailVerified) {
            return { message: 'Se o e-mail estiver cadastrado e não verificado, um código será enviado.' };
        }
        await this.sendChallenge(user);
        return { message: 'Novo código enviado para ' + email };
    }
    async forgotPassword(dto) {
        const email = this.normalizeEmail(dto.email);
        const user = await this.prisma.user.findUnique({ where: { email } });
        const genericResponse = {
            message: 'Se o e-mail estiver cadastrado, você receberá um link.',
        };
        if (!user || !user.emailVerified)
            return genericResponse;
        const rawToken = randomBytes(32).toString('hex');
        const hashedToken = createHash('sha256').update(rawToken).digest('hex');
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: new Date(Date.now() + 60 * 60_000),
            },
        });
        const frontendUrl = this.configService.get('FRONTEND_URL') ?? 'http://localhost:4200';
        const resetUrl = `${frontendUrl}/reset-password?token=${rawToken}`;
        await this.emailService.sendPasswordReset(user.email, resetUrl, user.nome);
        return genericResponse;
    }
    async resetPassword(dto) {
        this.validatePassword(dto.senha);
        const hashedToken = createHash('sha256').update(dto.token).digest('hex');
        const user = await this.prisma.user.findFirst({
            where: {
                resetPasswordToken: hashedToken,
                resetPasswordExpires: { gt: new Date() },
            },
        });
        if (!user) {
            throw new BadRequestException('Token inválido ou expirado.');
        }
        const hashedPassword = await bcrypt.hash(dto.senha, 12);
        await this.prisma.user.update({
            where: { id: user.id },
            data: {
                senha: hashedPassword,
                resetPasswordToken: null,
                resetPasswordExpires: null,
                authVersion: { increment: 1 },
            },
        });
        return { message: 'Senha redefinida com sucesso. Faça login novamente.' };
    }
    async handleGoogleLogin(googleUser) {
        const email = this.normalizeEmail(googleUser.email);
        let user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    nome: googleUser.nome,
                    email,
                    googleId: googleUser.googleId,
                    avatar: googleUser.avatar,
                    emailVerified: true,
                    tipo: 'CLIENTE',
                },
            });
        }
        else if (!user.googleId) {
            user = await this.prisma.user.update({
                where: { id: user.id },
                data: {
                    googleId: googleUser.googleId,
                    emailVerified: true,
                    avatar: user.avatar ?? googleUser.avatar,
                },
            });
        }
        return { access_token: this.generateJwt(user) };
    }
    async logout(userId) {
        await this.prisma.user.update({
            where: { id: userId },
            data: { authVersion: { increment: 1 } },
        });
        return { message: 'Logout realizado com sucesso.' };
    }
};
AuthService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService,
        JwtService,
        EmailService,
        ConfigService])
], AuthService);
export { AuthService };
//# sourceMappingURL=auth.service.js.map