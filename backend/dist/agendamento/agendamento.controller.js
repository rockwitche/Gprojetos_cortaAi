var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Controller, Get, Post, Put, Body, Param, UseGuards, Req, Query, ParseIntPipe, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OptionalJwtAuthGuard } from '../auth/guards/optional-jwt-auth.guard.js';
import { BarberAuthGuard } from '../auth/guards/barber-auth.guard.js';
import { CreateAgendamentoDto, ConsultaAgendamentosDto, } from './agendamento.dto.js';
import { AgendamentoService } from './agendamento.service.js';
let AgendamentoController = class AgendamentoController {
    agendamentoService;
    constructor(agendamentoService) {
        this.agendamentoService = agendamentoService;
    }
    async create(body, req) {
        const userId = req.user?.id;
        return this.agendamentoService.create({ ...body, userId });
    }
    async meus(req) {
        const user = req.user;
        return this.agendamentoService.findByUser(user.id);
    }
    async usoMensal(req) {
        const user = req.user;
        return this.agendamentoService.contarAgendamentosMes(user.id);
    }
    async agenda(req, params) {
        const user = req.user;
        const data = req.query.data;
        return this.agendamentoService.findByOwner(user.id, data);
    }
    async consultarPorTelefone(body) {
        return this.agendamentoService.findByTelefone(body.telefone, body.comprovantes);
    }
    async cancelarPorTelefone(id, telefone, comprovante) {
        return this.agendamentoService.cancelarPorTelefone(id, telefone, comprovante);
    }
    async horariosOcupados(barbeiroId, req, duracao) {
        const data = req.query.data;
        if (!data)
            return [];
        return this.agendamentoService.horariosOcupados(barbeiroId, data, duracao);
    }
    async porBarbearia(barbeariaId, req) {
        return this.agendamentoService.findByBarbearia(barbeariaId, req.user.id);
    }
    async updateStatus(id, status, req) {
        const user = req.user;
        return this.agendamentoService.updateStatus(id, user.id, status);
    }
    async cancelar(id, req) {
        const user = req.user;
        return this.agendamentoService.cancelar(id, user.id);
    }
    async lembretesPendentes(req) {
        const user = req.user;
        return this.agendamentoService.findLembretesPendentes(user.id);
    }
    async clientes(req) {
        const user = req.user;
        return this.agendamentoService.findClientesByOwner(user.id);
    }
    async marcarLembreteEnviado(id, req) {
        const user = req.user;
        return this.agendamentoService.marcarLembreteEnviado(id, user.id);
    }
};
__decorate([
    Post(),
    UseGuards(OptionalJwtAuthGuard),
    __param(0, Body()),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateAgendamentoDto, Object]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "create", null);
__decorate([
    UseGuards(AuthGuard('jwt')),
    Get('meus'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "meus", null);
__decorate([
    UseGuards(BarberAuthGuard),
    Get('uso-mensal'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "usoMensal", null);
__decorate([
    UseGuards(BarberAuthGuard),
    Get('agenda'),
    __param(0, Req()),
    __param(1, Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "agenda", null);
__decorate([
    Post('consultar'),
    __param(0, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [ConsultaAgendamentosDto]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "consultarPorTelefone", null);
__decorate([
    Put(':id/cancelar-telefone'),
    __param(0, Param('id')),
    __param(1, Body('telefone')),
    __param(2, Body('comprovante')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "cancelarPorTelefone", null);
__decorate([
    Get('ocupados/:barbeiroId'),
    __param(0, Param('barbeiroId')),
    __param(1, Req()),
    __param(2, Query('duracao', new ParseIntPipe({ optional: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Number]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "horariosOcupados", null);
__decorate([
    UseGuards(BarberAuthGuard),
    Get('barbearia/:barbeariaId'),
    __param(0, Param('barbeariaId')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "porBarbearia", null);
__decorate([
    UseGuards(BarberAuthGuard),
    Put(':id/status'),
    __param(0, Param('id')),
    __param(1, Body('status')),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "updateStatus", null);
__decorate([
    UseGuards(AuthGuard('jwt')),
    Put(':id/cancelar'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "cancelar", null);
__decorate([
    UseGuards(BarberAuthGuard),
    Get('lembretes/pendentes'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "lembretesPendentes", null);
__decorate([
    UseGuards(BarberAuthGuard),
    Get('clientes'),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "clientes", null);
__decorate([
    UseGuards(BarberAuthGuard),
    Put(':id/lembrete-enviado'),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], AgendamentoController.prototype, "marcarLembreteEnviado", null);
AgendamentoController = __decorate([
    Controller('agendamentos'),
    __metadata("design:paramtypes", [AgendamentoService])
], AgendamentoController);
export { AgendamentoController };
//# sourceMappingURL=agendamento.controller.js.map