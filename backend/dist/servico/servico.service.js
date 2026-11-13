var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { BadRequestException, ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let ServicoService = class ServicoService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByBarbearia(barbeariaId) {
        return this.prisma.servico.findMany({ where: { barbeariaId }, orderBy: { createdAt: 'asc' } });
    }
    async create(barbeariaId, ownerId, dto) {
        await this.verificarDonoDaBarbearia(barbeariaId, ownerId);
        await this.validarBarbeiro(dto.barbeiroId, barbeariaId);
        const servico = await this.prisma.servico.create({
            data: { ...dto, nome: dto.nome.trim(), barbeariaId },
        });
        return { message: 'Serviço adicionado com sucesso.', servico };
    }
    async update(id, ownerId, dto) {
        const servico = await this.prisma.servico.findUnique({
            where: { id },
            include: { barbearia: { select: { ownerId: true } } },
        });
        if (!servico)
            throw new NotFoundException('Serviço não encontrado.');
        if (servico.barbearia.ownerId !== ownerId)
            throw new ForbiddenException('Sem permissão para este serviço.');
        await this.validarBarbeiro(dto.barbeiroId, servico.barbeariaId);
        const atualizado = await this.prisma.servico.update({
            where: { id },
            data: { ...dto, ...(dto.nome ? { nome: dto.nome.trim() } : {}) },
        });
        return { message: 'Serviço atualizado com sucesso.', servico: atualizado };
    }
    async remove(id, ownerId) {
        const servico = await this.prisma.servico.findUnique({
            where: { id },
            include: { barbearia: { select: { ownerId: true } } },
        });
        if (!servico)
            throw new NotFoundException('Serviço não encontrado.');
        if (servico.barbearia.ownerId !== ownerId)
            throw new ForbiddenException('Sem permissão para este serviço.');
        await this.prisma.servico.delete({ where: { id } });
        return { message: 'Serviço excluído com sucesso.' };
    }
    async verificarDonoDaBarbearia(barbeariaId, ownerId) {
        const barbearia = await this.prisma.barbearia.findUnique({ where: { id: barbeariaId } });
        if (!barbearia)
            throw new NotFoundException('Barbearia não encontrada.');
        if (barbearia.ownerId !== ownerId)
            throw new ForbiddenException('Sem permissão para esta barbearia.');
    }
    async validarBarbeiro(barbeiroId, barbeariaId) {
        if (!barbeiroId)
            return;
        const barbeiro = await this.prisma.barbeiro.findFirst({ where: { id: barbeiroId, barbeariaId } });
        if (!barbeiro)
            throw new BadRequestException('O barbeiro não pertence a esta barbearia.');
    }
};
ServicoService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], ServicoService);
export { ServicoService };
//# sourceMappingURL=servico.service.js.map