var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Type } from 'class-transformer';
import { IsBoolean, IsInt, IsNumber, IsOptional, IsString, IsUUID, Length, Max, Min } from 'class-validator';
export class CreateServicoDto {
    nome;
    preco;
    duracao;
    barbeiroId;
}
__decorate([
    IsString(),
    Length(2, 120),
    __metadata("design:type", String)
], CreateServicoDto.prototype, "nome", void 0);
__decorate([
    Type(() => Number),
    IsNumber({ maxDecimalPlaces: 2 }),
    Min(0),
    Max(100_000),
    __metadata("design:type", Number)
], CreateServicoDto.prototype, "preco", void 0);
__decorate([
    Type(() => Number),
    IsInt(),
    Min(1),
    Max(720),
    __metadata("design:type", Number)
], CreateServicoDto.prototype, "duracao", void 0);
__decorate([
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], CreateServicoDto.prototype, "barbeiroId", void 0);
export class UpdateServicoDto {
    nome;
    preco;
    duracao;
    barbeiroId;
    ativo;
}
__decorate([
    IsOptional(),
    IsString(),
    Length(2, 120),
    __metadata("design:type", String)
], UpdateServicoDto.prototype, "nome", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsNumber({ maxDecimalPlaces: 2 }),
    Min(0),
    Max(100_000),
    __metadata("design:type", Number)
], UpdateServicoDto.prototype, "preco", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsInt(),
    Min(1),
    Max(720),
    __metadata("design:type", Number)
], UpdateServicoDto.prototype, "duracao", void 0);
__decorate([
    IsOptional(),
    IsUUID(),
    __metadata("design:type", String)
], UpdateServicoDto.prototype, "barbeiroId", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateServicoDto.prototype, "ativo", void 0);
//# sourceMappingURL=servico.dto.js.map