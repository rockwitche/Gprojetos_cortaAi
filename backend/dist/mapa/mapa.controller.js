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
import { Controller, Get, Query } from '@nestjs/common';
import { BuscarMapaDto } from './dto/buscar-mapa.dto.js';
import { MapaService } from './mapa.service.js';
let MapaController = class MapaController {
    mapaService;
    constructor(mapaService) {
        this.mapaService = mapaService;
    }
    buscar(dto) {
        return this.mapaService.buscar(dto);
    }
};
__decorate([
    Get('buscar'),
    __param(0, Query()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [BuscarMapaDto]),
    __metadata("design:returntype", void 0)
], MapaController.prototype, "buscar", null);
MapaController = __decorate([
    Controller('mapa'),
    __metadata("design:paramtypes", [MapaService])
], MapaController);
export { MapaController };
//# sourceMappingURL=mapa.controller.js.map