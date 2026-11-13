import { AuthService } from './auth.service.js';
import { RegisterDto, LoginDto, VerifyEmailDto, ResendCodeDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto.js';
import type { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    private getCookieOptions;
    private getClearCookieOptions;
    check(req: Request): {
        authenticated: boolean;
        user: Express.User | undefined;
    };
    getMe(req: Request): Promise<{
        id: string;
        nome: string;
        email: string;
        telefone: string | null;
        tipo: import("../generated/prisma/index.js").$Enums.UserType;
        plano: import("../generated/prisma/index.js").$Enums.Plano;
        avatar: string | null;
        emailVerified: boolean;
    }>;
    checkEmail(email: string): Promise<{
        exists: boolean;
        valid: boolean;
        reason: string | null;
    }>;
    register(dto: RegisterDto): Promise<{
        message: string;
        email: string;
        verificationToken: string;
        requiresVerification: boolean;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        requiresVerification: boolean;
        email: string;
        verificationToken: string;
        message: string;
        access_token?: undefined;
        user?: undefined;
        rememberMe?: undefined;
    } | {
        access_token: string;
        user: {
            id: string;
            nome: string;
            email: string;
            telefone: string | null;
            tipo: import("../generated/prisma/index.js").$Enums.UserType;
            plano: import("../generated/prisma/index.js").$Enums.Plano;
            avatar: string | null;
        };
        rememberMe: boolean | undefined;
        requiresVerification?: undefined;
        email?: undefined;
        verificationToken?: undefined;
        message?: undefined;
    } | {
        message: string;
        user: {
            id: string;
            nome: string;
            email: string;
            telefone: string | null;
            tipo: import("../generated/prisma/index.js").$Enums.UserType;
            plano: import("../generated/prisma/index.js").$Enums.Plano;
            avatar: string | null;
        };
    }>;
    verifyEmail(req: Request, dto: VerifyEmailDto, res: Response): Promise<{
        message: string;
    }>;
    resendCode(dto: ResendCodeDto): Promise<{
        message: string;
    }>;
    forgotPassword(dto: ForgotPasswordDto): Promise<{
        message: string;
    }>;
    resetPassword(dto: ResetPasswordDto): Promise<{
        message: string;
    }>;
    logout(req: Request, res: Response): Promise<{
        message: string;
    }>;
    googleLogin(): void;
    googleCallback(req: Request, res: Response): Promise<void>;
}
