import { PrismaService } from '../prisma/prisma.service.js';
import { UpdateUserDto } from './dto/update-user.dto.js';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    findById(id: string): Promise<{
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
    update(id: string, dto: UpdateUserDto): Promise<{
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
    uploadAvatar(id: string, file: Express.Multer.File): Promise<{
        message: string;
        avatar: string | null;
    }>;
    deleteAccount(id: string): Promise<{
        message: string;
    }>;
}
