import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { EmailService } from './email.service.js';
import { RegisterDto, LoginDto, VerifyEmailDto, ResendCodeDto, ForgotPasswordDto, ResetPasswordDto } from './dto/auth.dto.js';
export declare class AuthService {
    private prisma;
    private jwtService;
    private emailService;
    private configService;
    constructor(prisma: PrismaService, jwtService: JwtService, emailService: EmailService, configService: ConfigService);
    private normalizeEmail;
    checkEmailExists(email: string): Promise<{
        exists: boolean;
        valid: boolean;
        reason: string | null;
    }>;
    getMe(userId: string): Promise<{
        id: string;
        nome: string;
        email: string;
        telefone: string | null;
        tipo: import("../generated/prisma/index.js").$Enums.UserType;
        plano: import("../generated/prisma/index.js").$Enums.Plano;
        avatar: string | null;
        emailVerified: boolean;
    }>;
    private validatePassword;
    private secret;
    private otpHash;
    private generateJwt;
    register(dto: RegisterDto): Promise<{
        message: string;
        email: string;
        verificationToken: string;
        requiresVerification: boolean;
    }>;
    login(dto: LoginDto): Promise<{
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
    }>;
    private sendChallenge;
    verifyEmail(userId: string, dto: VerifyEmailDto): Promise<{
        message: string;
        access_token?: undefined;
        user?: undefined;
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
    handleGoogleLogin(googleUser: {
        googleId: string;
        email: string;
        nome: string;
        avatar?: string;
    }): Promise<{
        access_token: string;
    }>;
    logout(userId: string): Promise<{
        message: string;
    }>;
}
