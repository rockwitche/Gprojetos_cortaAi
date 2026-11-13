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
import { Controller, Get, Put, Body, Param, UseGuards, Req, } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { HorarioService } from './horario.service.js';
let HorarioController = class HorarioController {
    horarioService;
    constructor(horarioService) {
        this.horarioService = horarioService;
    }
    async findAll(barbeiroId) {
        return this.horarioService.findByBarbeiro(barbeiroId);
    }
    async setHorarios(barbeiroId, body, req) {
        const user = req.user;
        return this.horarioService.setHorarios(barbeiroId, user.id, body.horarios);
    }
};
__decorate([
    Get(),
    __param(0, Param('barbeiroId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], HorarioController.prototype, "findAll", null);
__decorate([
    UseGuards(AuthGuard('jwt')),
    Put(),
    __param(0, Param('barbeiroId')),
    __param(1, Body()),
    __param(2, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], HorarioController.prototype, "setHorarios", null);
HorarioController = __decorate([
    Controller('barbeiros/:barbeiroId/horarios'),
    __metadata("design:paramtypes", [HorarioService])
], HorarioController);
export { HorarioController };
//# sourceMappingURL=horario.controller.js.map