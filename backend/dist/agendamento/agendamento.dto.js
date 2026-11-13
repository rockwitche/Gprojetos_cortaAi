var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsString, IsUUID, Matches, Length, ArrayMaxSize, IsArray, } from 'class-validator';
export class CreateAgendamentoDto {
    data;
    horario;
    nomeCliente;
    telefoneCliente;
    barbeariaId;
    barbeiroId;
    servicoId;
}
__decorate([
    Matches(/^\d{4}-\d{2}-\d{2}$/),
    __metadata("design:type", String)
], CreateAgendamentoDto.prototype, "data", void 0);
__decorate([
    Matches(/^(?:[01]\d|2[0-3]):[0-5]\d$/),
    __metadata("design:type", String)
], CreateAgendamentoDto.prototype, "horario", void 0);
__decorate([
    IsString(),
    Length(1, 150),
    __metadata("design:type", String)
], CreateAgendamentoDto.prototype, "nomeCliente", void 0);
__decorate([
    IsString(),
    Length(10, 20),
    __metadata("design:type", String)
], CreateAgendamentoDto.prototype, "telefoneCliente", void 0);
__decorate([
    IsUUID(),
    __metadata("design:type", String)
], CreateAgendamentoDto.prototype, "barbeariaId", void 0);
__decorate([
    IsUUID(),
    __metadata("design:type", String)
], CreateAgendamentoDto.prototype, "barbeiroId", void 0);
__decorate([
    IsUUID(),
    __metadata("design:type", String)
], CreateAgendamentoDto.prototype, "servicoId", void 0);
export class ConsultaAgendamentosDto {
    telefone;
    comprovantes;
}
__decorate([
    IsString(),
    Length(10, 20),
    __metadata("design:type", String)
], ConsultaAgendamentosDto.prototype, "telefone", void 0);
__decorate([
    IsArray(),
    ArrayMaxSize(100),
    Matches(/^[a-f0-9]{64}$/, { each: true }),
    __metadata("design:type", Array)
], ConsultaAgendamentosDto.prototype, "comprovantes", void 0);
//# sourceMappingURL=agendamento.dto.js.map