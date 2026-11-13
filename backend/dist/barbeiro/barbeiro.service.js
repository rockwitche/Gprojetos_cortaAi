var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let BarbeiroService = class BarbeiroService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByBarbearia(barbeariaId) {
        return this.prisma.barbeiro.findMany({
            where: { barbeariaId },
            include: { servicos: { where: { ativo: true }, orderBy: { createdAt: 'asc' } } },
            orderBy: { createdAt: 'asc' },
        });
    }
    async create(barbeariaId, ownerId, dto) {
        await this.verificarDonoDaBarbearia(barbeariaId, ownerId);
        const barbeiro = await this.prisma.barbeiro.create({
            data: { barbeariaId, nome: dto.nome.trim(), foto: dto.foto },
        });
        return { message: 'Barbeiro adicionado com sucesso.', barbeiro };
    }
    async update(id, ownerId, dto) {
        const barbeiro = await this.verificarDonoDoBarbeiro(id, ownerId);
        const atualizado = await this.prisma.barbeiro.update({
            where: { id: barbeiro.id },
            data: { ...dto, ...(dto.nome ? { nome: dto.nome.trim() } : {}) },
        });
        return { message: 'Barbeiro atualizado com sucesso.', barbeiro: atualizado };
    }
    async remove(id, ownerId) {
        const barbeiro = await this.verificarDonoDoBarbeiro(id, ownerId);
        await this.prisma.barbeiro.delete({ where: { id: barbeiro.id } });
        return { message: 'Barbeiro excluído com sucesso.' };
    }
    async verificarDonoDaBarbearia(barbeariaId, ownerId) {
        const barbearia = await this.prisma.barbearia.findUnique({ where: { id: barbeariaId } });
        if (!barbearia)
            throw new NotFoundException('Barbearia não encontrada.');
        if (barbearia.ownerId !== ownerId)
            throw new ForbiddenException('Sem permissão para esta barbearia.');
        return barbearia;
    }
    async verificarDonoDoBarbeiro(id, ownerId) {
        const barbeiro = await this.prisma.barbeiro.findUnique({
            where: { id },
            include: { barbearia: { select: { ownerId: true } } },
        });
        if (!barbeiro)
            throw new NotFoundException('Barbeiro não encontrado.');
        if (barbeiro.barbearia.ownerId !== ownerId)
            throw new ForbiddenException('Sem permissão para este barbeiro.');
        return barbeiro;
    }
};
BarbeiroService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], BarbeiroService);
export { BarbeiroService };
//# sourceMappingURL=barbeiro.service.js.map