import { UserService } from './user.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
import type { Request } from 'express';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    getProfile(req: Request): Promise<{
        id: string;
        nome: string;
        email: string;
        telefone: string | null;
        tipo: import("../generated/prisma/index.js").$Enums.UserType;
        plano: import("../generated/prisma/index.js").$Enums.Plano;
        avatar: string | null;
        emailVerified: boolean;
        createdAt: Date;
    }>;
    updateProfile(req: Request, dto: UpdateUserDto): Promise<{
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
    uploadAvatar(req: Request, file: Express.Multer.File): Promise<{
        message: string;
        avatar: string | null;
    }>;
    deleteAccount(req: Request): Promise<{
        message: string;
    }>;
}
