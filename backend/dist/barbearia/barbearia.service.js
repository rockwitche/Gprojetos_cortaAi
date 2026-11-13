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
let BarbeariaService = class BarbeariaService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    normalizarSlug(nome) {
        return nome
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    }
    async gerarSlugUnico(nome, ignorarId) {
        const base = this.normalizarSlug(nome) || 'barbearia';
        let candidato = base;
        let sufixo = 2;
        while (true) {
            const existente = await this.prisma.barbearia.findUnique({ where: { slug: candidato } });
            if (!existente || existente.id === ignorarId)
                return candidato;
            candidato = `${base}-${sufixo++}`;
        }
    }
    dadosNormalizados(dto) {
        return {
            ...dto,
            nome: dto.nome?.trim(),
            endereco: dto.endereco?.trim(),
            cidade: dto.cidade?.trim(),
            estado: dto.estado?.trim().toUpperCase(),
            descricao: dto.descricao?.trim(),
            pontoReferencia: dto.pontoReferencia?.trim(),
            telefone: dto.telefone?.trim(),
            whatsapp: dto.whatsapp?.trim(),
        };
    }
    async create(ownerId, dto) {
        const dados = this.dadosNormalizados(dto);
        const slug = await this.gerarSlugUnico(dados.nome);
        const barbearia = await this.prisma.barbearia.create({
            data: { ...dados, slug, ownerId },
        });
        return { message: 'Barbearia criada com sucesso.', barbearia };
    }
    async findAll(estado, cidade, busca) {
        const termo = busca?.trim();
        return this.prisma.barbearia.findMany({
            where: {
                ativa: true,
                ...(estado?.trim() ? { estado: { equals: estado.trim(), mode: 'insensitive' } } : {}),
                ...(cidade?.trim() ? { cidade: { equals: cidade.trim(), mode: 'insensitive' } } : {}),
                ...(termo ? { nome: { contains: termo, mode: 'insensitive' } } : {}),
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findAllByOwner(ownerId) {
        return this.prisma.barbearia.findMany({ where: { ownerId }, orderBy: { createdAt: 'desc' } });
    }
    async findBySlugOuId(slugOuId) {
        const incluir = {
            barbeiros: { include: { servicos: { where: { ativo: true } } }, orderBy: { createdAt: 'asc' } },
            servicos: { where: { ativo: true }, orderBy: { createdAt: 'asc' } },
        };
        const porSlug = await this.prisma.barbearia.findUnique({ where: { slug: slugOuId }, include: incluir });
        const barbearia = porSlug ?? await this.prisma.barbearia.findUnique({ where: { id: slugOuId }, include: incluir });
        if (!barbearia)
            throw new NotFoundException('Barbearia não encontrada.');
        return barbearia;
    }
    async update(id, ownerId, dto) {
        await this.verificarPropriedade(id, ownerId);
        const dados = this.dadosNormalizados(dto);
        const barbearia = await this.prisma.barbearia.update({
            where: { id },
            data: { ...dados, ...(dados.nome ? { slug: await this.gerarSlugUnico(dados.nome, id) } : {}) },
        });
        return { message: 'Barbearia atualizada com sucesso.', barbearia };
    }
    async remove(id, ownerId) {
        await this.verificarPropriedade(id, ownerId);
        await this.prisma.barbearia.delete({ where: { id } });
        return { message: 'Barbearia excluída com sucesso.' };
    }
    async verificarPropriedade(id, ownerId) {
        const barbearia = await this.prisma.barbearia.findUnique({ where: { id } });
        if (!barbearia)
            throw new NotFoundException('Barbearia não encontrada.');
        if (barbearia.ownerId !== ownerId)
            throw new ForbiddenException('Sem permissão para esta barbearia.');
        return barbearia;
    }
};
BarbeariaService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], BarbeariaService);
export { BarbeariaService };
//# sourceMappingURL=barbearia.service.js.map