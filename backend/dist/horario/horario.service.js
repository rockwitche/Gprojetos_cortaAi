var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable, NotFoundException, ForbiddenException, BadRequestException, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
let HorarioService = class HorarioService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async verificarDonoBarbeiro(barbeiroId, ownerId) {
        const barbeiro = await this.prisma.barbeiro.findUnique({
            where: { id: barbeiroId },
            include: { barbearia: true },
        });
        if (!barbeiro)
            throw new NotFoundException('Barbeiro não encontrado.');
        if (barbeiro.barbearia.ownerId !== ownerId)
            throw new ForbiddenException('Sem permissão.');
        return barbeiro;
    }
    async setHorarios(barbeiroId, ownerId, horarios) {
        await this.verificarDonoBarbeiro(barbeiroId, ownerId);
        const time = (v) => typeof v === 'string' && /^(?:[01]\d|2[0-3]):[0-5]\d$/.test(v);
        if (!Array.isArray(horarios) ||
            horarios.length > 7 ||
            new Set(horarios.map((h) => h?.diaSemana)).size !== horarios.length ||
            horarios.some((h) => !h ||
                !Number.isInteger(h.diaSemana) ||
                h.diaSemana < 0 ||
                h.diaSemana > 6 ||
                !time(h.horaInicio) ||
                !time(h.horaFim) ||
                h.horaInicio >= h.horaFim ||
                ((h.almocoInicio || h.almocoFim) &&
                    (!time(h.almocoInicio) ||
                        !time(h.almocoFim) ||
                        h.almocoInicio >= h.almocoFim ||
                        h.almocoInicio < h.horaInicio ||
                        h.almocoFim > h.horaFim)))) {
            throw new BadRequestException('Horários inválidos. Informe até um período válido por dia.');
        }
        await this.prisma.$transaction(async (tx) => {
            await tx.horarioDisponivel.deleteMany({
                where: { barbeiroId },
            });
            await tx.horarioDisponivel.createMany({
                data: horarios.map((h) => ({
                    barbeiroId,
                    diaSemana: h.diaSemana,
                    horaInicio: h.horaInicio,
                    horaFim: h.horaFim,
                    almocoInicio: h.almocoInicio || null,
                    almocoFim: h.almocoFim || null,
                })),
            });
        });
        const result = await this.prisma.horarioDisponivel.findMany({
            where: { barbeiroId },
            orderBy: { diaSemana: 'asc' },
        });
        return { message: 'Horários atualizados!', horarios: result };
    }
    async findByBarbeiro(barbeiroId) {
        return this.prisma.horarioDisponivel.findMany({
            where: { barbeiroId },
            orderBy: { diaSemana: 'asc' },
        });
    }
};
HorarioService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [PrismaService])
], HorarioService);
export { HorarioService };
//# sourceMappingURL=horario.service.js.map