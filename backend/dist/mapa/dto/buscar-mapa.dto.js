var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsOptional, IsString, MaxLength } from 'class-validator';
export class BuscarMapaDto {
    endereco;
    cidade;
    estado;
    cep;
}
__decorate([
    IsString(),
    MaxLength(250),
    __metadata("design:type", String)
], BuscarMapaDto.prototype, "endereco", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(120),
    __metadata("design:type", String)
], BuscarMapaDto.prototype, "cidade", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(2),
    __metadata("design:type", String)
], BuscarMapaDto.prototype, "estado", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(9),
    __metadata("design:type", String)
], BuscarMapaDto.prototype, "cep", void 0);
//# sourceMappingURL=buscar-mapa.dto.js.map