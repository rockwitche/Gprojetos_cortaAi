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
import { ArrayMaxSize, IsArray, IsBoolean, IsLatitude, IsLongitude, IsOptional, IsString, IsUrl, Length, MaxLength, } from 'class-validator';
export class CreateBarbeariaDto {
    nome;
    endereco;
    cidade;
    estado;
    descricao;
    cep;
    pontoReferencia;
    latitude;
    longitude;
    telefone;
    whatsapp;
    mensagemLembrete;
    lembreteAtivo;
    foto;
    fotos;
    ativa;
}
__decorate([
    IsString(),
    Length(2, 120),
    __metadata("design:type", String)
], CreateBarbeariaDto.prototype, "nome", void 0);
__decorate([
    IsString(),
    Length(2, 200),
    __metadata("design:type", String)
], CreateBarbeariaDto.prototype, "endereco", void 0);
__decorate([
    IsString(),
    Length(2, 120),
    __metadata("design:type", String)
], CreateBarbeariaDto.prototype, "cidade", void 0);
__decorate([
    IsString(),
    Length(2, 2),
    __metadata("design:type", String)
], CreateBarbeariaDto.prototype, "estado", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(2_000),
    __metadata("design:type", String)
], CreateBarbeariaDto.prototype, "descricao", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(20),
    __metadata("design:type", String)
], CreateBarbeariaDto.prototype, "cep", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], CreateBarbeariaDto.prototype, "pontoReferencia", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsLatitude(),
    __metadata("design:type", Number)
], CreateBarbeariaDto.prototype, "latitude", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsLongitude(),
    __metadata("design:type", Number)
], CreateBarbeariaDto.prototype, "longitude", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(30),
    __metadata("design:type", String)
], CreateBarbeariaDto.prototype, "telefone", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(30),
    __metadata("design:type", String)
], CreateBarbeariaDto.prototype, "whatsapp", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(1_000),
    __metadata("design:type", String)
], CreateBarbeariaDto.prototype, "mensagemLembrete", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateBarbeariaDto.prototype, "lembreteAtivo", void 0);
__decorate([
    IsOptional(),
    IsUrl({ require_tld: false }),
    MaxLength(2_000),
    __metadata("design:type", String)
], CreateBarbeariaDto.prototype, "foto", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ArrayMaxSize(10),
    IsUrl({ require_tld: false }, { each: true }),
    __metadata("design:type", Array)
], CreateBarbeariaDto.prototype, "fotos", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], CreateBarbeariaDto.prototype, "ativa", void 0);
export class UpdateBarbeariaDto {
    nome;
    endereco;
    cidade;
    estado;
    descricao;
    cep;
    pontoReferencia;
    latitude;
    longitude;
    telefone;
    whatsapp;
    mensagemLembrete;
    lembreteAtivo;
    foto;
    fotos;
    ativa;
}
__decorate([
    IsOptional(),
    IsString(),
    Length(2, 120),
    __metadata("design:type", String)
], UpdateBarbeariaDto.prototype, "nome", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Length(2, 200),
    __metadata("design:type", String)
], UpdateBarbeariaDto.prototype, "endereco", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Length(2, 120),
    __metadata("design:type", String)
], UpdateBarbeariaDto.prototype, "cidade", void 0);
__decorate([
    IsOptional(),
    IsString(),
    Length(2, 2),
    __metadata("design:type", String)
], UpdateBarbeariaDto.prototype, "estado", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(2_000),
    __metadata("design:type", String)
], UpdateBarbeariaDto.prototype, "descricao", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(20),
    __metadata("design:type", String)
], UpdateBarbeariaDto.prototype, "cep", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(200),
    __metadata("design:type", String)
], UpdateBarbeariaDto.prototype, "pontoReferencia", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsLatitude(),
    __metadata("design:type", Number)
], UpdateBarbeariaDto.prototype, "latitude", void 0);
__decorate([
    IsOptional(),
    Type(() => Number),
    IsLongitude(),
    __metadata("design:type", Number)
], UpdateBarbeariaDto.prototype, "longitude", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(30),
    __metadata("design:type", String)
], UpdateBarbeariaDto.prototype, "telefone", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(30),
    __metadata("design:type", String)
], UpdateBarbeariaDto.prototype, "whatsapp", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(1_000),
    __metadata("design:type", String)
], UpdateBarbeariaDto.prototype, "mensagemLembrete", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateBarbeariaDto.prototype, "lembreteAtivo", void 0);
__decorate([
    IsOptional(),
    IsUrl({ require_tld: false }),
    MaxLength(2_000),
    __metadata("design:type", String)
], UpdateBarbeariaDto.prototype, "foto", void 0);
__decorate([
    IsOptional(),
    IsArray(),
    ArrayMaxSize(10),
    IsUrl({ require_tld: false }, { each: true }),
    __metadata("design:type", Array)
], UpdateBarbeariaDto.prototype, "fotos", void 0);
__decorate([
    IsOptional(),
    IsBoolean(),
    __metadata("design:type", Boolean)
], UpdateBarbeariaDto.prototype, "ativa", void 0);
//# sourceMappingURL=barbearia.dto.js.map