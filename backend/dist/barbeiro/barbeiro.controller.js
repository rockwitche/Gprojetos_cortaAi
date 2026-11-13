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
import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { BarbeiroService } from './barbeiro.service.js';
import { CreateBarbeiroDto, UpdateBarbeiroDto } from './dto/barbeiro.dto.js';
let BarbeiroController = class BarbeiroController {
    service;
    constructor(service) {
        this.service = service;
    }
    findAll(barbeariaId) {
        return this.service.findByBarbearia(barbeariaId);
    }
    create(barbeariaId, req, dto) {
        return this.service.create(barbeariaId, req.user.id, dto);
    }
    update(id, req, dto) {
        return this.service.update(id, req.user.id, dto);
    }
    remove(id, req) {
        return this.service.remove(id, req.user.id);
    }
};
__decorate([
    Get(),
    __param(0, Param('barbeariaId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], BarbeiroController.prototype, "findAll", null);
__decorate([
    Post(),
    UseGuards(AuthGuard('jwt')),
    __param(0, Param('barbeariaId')),
    __param(1, Req()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, CreateBarbeiroDto]),
    __metadata("design:returntype", void 0)
], BarbeiroController.prototype, "create", null);
__decorate([
    Put(':id'),
    UseGuards(AuthGuard('jwt')),
    __param(0, Param('id')),
    __param(1, Req()),
    __param(2, Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, UpdateBarbeiroDto]),
    __metadata("design:returntype", void 0)
], BarbeiroController.prototype, "update", null);
__decorate([
    Delete(':id'),
    UseGuards(AuthGuard('jwt')),
    __param(0, Param('id')),
    __param(1, Req()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], BarbeiroController.prototype, "remove", null);
BarbeiroController = __decorate([
    Controller('barbearias/:barbeariaId/barbeiros'),
    __metadata("design:paramtypes", [BarbeiroService])
], BarbeiroController);
export { BarbeiroController };
//# sourceMappingURL=barbeiro.controller.js.map