import { ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
export interface GoogleAuthRequest extends Request {
    googleAuth?: {
        tipo: 'CLIENTE' | 'BARBEIRO';
        rememberMe: boolean;
    };
    googleState?: string;
}
declare const GoogleAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class GoogleAuthGuard extends GoogleAuthGuard_base {
    private readonly jwt;
    constructor(jwt: JwtService);
    canActivate(context: ExecutionContext): Promise<boolean>;
    getAuthenticateOptions(context: ExecutionContext): {
        state?: string | undefined;
        session: boolean;
    };
}
export {};
