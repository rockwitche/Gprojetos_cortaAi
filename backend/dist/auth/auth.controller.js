var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Post, Body, Get, Query, UseGuards, Req, Res, HttpCode, HttpStatus, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service.js';
import { GoogleAuthGuard } from './guards/google-auth.guard.js';
import { RegisterDto, LoginDto, VerifyEmailDto, ResendCodeDto, ForgotPasswordDto, ResetPasswordDto, } from './dto/auth.dto.js';
let AuthController = class AuthController {
    authService;
    constructor(authService) {
        this.authService = authService;
    }
    getCookieOptions(rememberMe = false) {
        const isProduction = process.env.NODE_ENV === 'production';
        const base = {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
            path: '/',
        };
        return rememberMe
            ? { ...base, maxAge: 30 * 24 * 60 * 60 * 1000 }
            : base;
    }
    getClearCookieOptions() {
        const isProduction = process.env.NODE_ENV === 'production';
        return {
            path: '/',
            secure: isProduction,
            sameSite: isProduction ? 'none' : 'lax',
        };
    }
    check(req) {
        return { authenticated: true, user: req.user };
    }
    async getMe(req) {
        const user = req.user;
        return this.authService.getMe(user.id);
    }
    async checkEmail(email) {
        return this.authService.checkEmailExists(email);
    }
    async register(dto) {
        return this.authService.register(dto);
    }
    async login(dto, res) {
        const result = await this.authService.login(dto);
        if ('requiresVerification' in result) {
            return result;
        }
        if (result.access_token) {
            res.cookie('access_token', result.access_token, this.getCookieOptions(result.rememberMe));
        }
        return { message: 'Login realizado com sucesso.', user: result.user };
    }
    async verifyEmail(req, dto, res) {
        const user = req.user;
        const result = await this.authService.verifyEmail(user.id, dto);
        if (result.access_token) {
            res.cookie('access_token', result.access_token, this.getCookieOptions());
        }
        return { message: result.message };
    }
    async resendCode(dto) {
        return this.authService.resendCode(dto);
    }
    async forgotPassword(dto) {
        return this.authService.forgotPassword(dto);
    }
    async resetPassword(dto) {
        return this.authService.resetPassword(dto);
    }
    async logout(req, res) {
        const user = req.user;
        await this.authService.logout(user.id);
        res.clearCookie('access_token', this.getClearCookieOptions());
        return { message: 'Logout realizado com sucesso.' };
    }
    googleLogin() {
    }
    async googleCallback(req, res) {
        const googleUser = req.user;
        const result = await this.authService.handleGoogleLogin(googleUser);
        if (result.access_token) {
            res.cookie('access_token', result.access_token, this.getCookieOptions());
        }
        const frontendUrl = process.env.FRONTEND_URL ?? 'http://localhost:4200';
        res.redirect(`${frontendUrl}/dashboard`);
    }
};
__decorate([
    Get('check'),
    UseGuards(AuthGuard('jwt')),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "check", null);
__decorate([
    Get('me'),
    UseGuards(AuthGuard('jwt')),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getMe", null);
__decorate([
    Get('check-email'),
    __param(0, Query('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "checkEmail", null);
__decorate([
    Post('register'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [RegisterDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    Post('login'),
    HttpCode(HttpStatus.OK),
    __param(0, Body()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [LoginDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    Post('verify-email'),
    UseGuards(AuthGuard('jwt')),
    __param(0, Req()),
    __param(1, Body()),
    __param(2, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, VerifyEmailDto, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "verifyEmail", null);
__decorate([
    Post('resend-code'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResendCodeDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resendCode", null);
__decorate([
    Post('forgot-password'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ForgotPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "forgotPassword", null);
__decorate([
    Post('reset-password'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ResetPasswordDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "resetPassword", null);
__decorate([
    Post('logout'),
    UseGuards(AuthGuard('jwt')),
    HttpCode(HttpStatus.OK),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logout", null);
__decorate([
    Get('google'),
    UseGuards(GoogleAuthGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "googleLogin", null);
__decorate([
    Get('google/callback'),
    UseGuards(GoogleAuthGuard),
    __param(0, Req()),
    __param(1, Res({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleCallback", null);
AuthController = __decorate([
    Controller('auth'),
    __metadata("design:paramtypes", [AuthService])
], AuthController);
export { AuthController };
//# sourceMappingURL=auth.controller.js.map