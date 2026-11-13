var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, BadRequestException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let UserService = class UserService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findById(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                tipo: true,
                plano: true,
                avatar: true,
                emailVerified: true,
                createdAt: true,
            },
        });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        return user;
    }
    async update(id, dto) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        const { nome, telefone, tipo } = dto;
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { nome, telefone, tipo },
            select: {
                id: true,
                nome: true,
                email: true,
                telefone: true,
                tipo: true,
                plano: true,
                avatar: true,
            },
        });
        return {
            message: 'Perfil atualizado com sucesso',
            user: updatedUser,
        };
    }
    async uploadAvatar(id, file) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        if (!file || !file.mimetype.startsWith('image/')) {
            throw new BadRequestException('Arquivo inválido. Envie uma imagem.');
        }
        if (file.size > 5 * 1024 * 1024) {
            throw new BadRequestException('Imagem muito grande. Máximo 5 MB.');
        }
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
        const updatedUser = await this.prisma.user.update({
            where: { id },
            data: { avatar: base64 },
            select: { id: true, avatar: true },
        });
        return {
            message: 'Avatar atualizado com sucesso',
            avatar: updatedUser.avatar,
        };
    }
    async deleteAccount(id) {
        const user = await this.prisma.user.findUnique({ where: { id } });
        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }
        await this.prisma.user.delete({ where: { id } });
        return { message: 'Conta excluída com sucesso.' };
    }
};
UserService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], UserService);
export { UserService };
//# sourceMappingURL=user.service.js.map