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
import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BarbeariaService } from './barbearia.service.js';
import { CreateBarbeariaDto, UpdateBarbeariaDto } from './dto/barbearia.dto.js';
let BarbeariaController = class BarbeariaController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(estado, cidade, busca) {
        return this.service.findAll(estado, cidade, busca);
    }
    minhas(req) {
        return this.service.findAllByOwner(req.user.id);
    }
    findOne(slugOuId) {
        return this.service.findBySlugOuId(slugOuId);
    }
    create(req, dto) {
        return this.service.create(req.user.id, dto);
    }
    update(req, id, dto) {
        return this.service.update(id, req.user.id, dto);
    }
    remove(req, id) {
        return this.service.remove(id, req.user.id);
    }
};
__decorate([
    Get(),
    __param(0, Query('estado')),
    __param(1, Query('cidade')),
    __param(2, Query('busca')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", void 0)
], BarbeariaController.prototype, "findAll", null);
__decorate([
    Get('owner/me'),
    UseGuards(AuthGuard('jwt')),
    __param(0, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], BarbeariaController.prototype, "minhas", null);
__decorate([
    Get(':slugOuId'),
    __param(0, Param('slugOuId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BarbeariaController.prototype, "findOne", null);
__decorate([
    Post(),
    UseGuards(AuthGuard('jwt')),
    __param(0, Req()),
    __param(1, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, CreateBarbeariaDto]),
    __metadata("design:returntype", void 0)
], BarbeariaController.prototype, "create", null);
__decorate([
    Put(':id'),
    UseGuards(AuthGuard('jwt')),
    __param(0, Req()),
    __param(1, Param('id')),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, UpdateBarbeariaDto]),
    __metadata("design:returntype", void 0)
], BarbeariaController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(AuthGuard('jwt')),
    __param(0, Req()),
    __param(1, Param('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", void 0)
], BarbeariaController.prototype, "remove", null);
BarbeariaController = __decorate([
    Controller('barbearias'),
    __metadata("design:paramtypes", [BarbeariaService])
], BarbeariaController);
export { BarbeariaController };
//# sourceMappingURL=barbearia.controller.js.map