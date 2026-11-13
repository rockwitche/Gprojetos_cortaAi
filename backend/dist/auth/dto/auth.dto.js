var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsEmail, IsNotEmpty, IsOptional, IsBoolean, IsString, MinLength, MaxLength, IsEnum, Length, } from 'class-validator';
export var UserType;
(function (UserType) {
    UserType["CLIENTE"] = "CLIENTE";
    UserType["BARBEIRO"] = "BARBEIRO";
})(UserType || (UserType = {}));
export class RegisterDto {
    nome;
    email;
    senha;
    telefone;
    tipo;
    rememberMe;
}
__decorate([
    MaxLength(150),
    IsString(),
    IsNotEmpty({ message: 'Nome é obrigatório' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "nome", void 0);
__decorate([
    IsEmail({}, { message: 'Email inválido' }),
    IsNotEmpty({ message: 'Email é obrigatório' }),
    __metadata("design:type", String)
], RegisterDto.prototype, "email", void 0);
__decorate([
    IsString(),
    MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
    MaxLength(72),
    __metadata("design:type", String)
], RegisterDto.prototype, "senha", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], RegisterDto.prototype, "telefone", void 0);
__decorate([
    IsEnum(UserType, { message: 'Tipo inválido' }),
    IsOptional(),
    __metadata("design:type", String)
], RegisterDto.prototype, "tipo", void 0);
__decorate([
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], RegisterDto.prototype, "rememberMe", void 0);
export class LoginDto {
    email;
    senha;
    rememberMe;
}
__decorate([
    IsEmail({}, { message: 'Email inválido' }),
    IsNotEmpty(),
    __metadata("design:type", String)
], LoginDto.prototype, "email", void 0);
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], LoginDto.prototype, "senha", void 0);
__decorate([
    IsBoolean(),
    IsOptional(),
    __metadata("design:type", Boolean)
], LoginDto.prototype, "rememberMe", void 0);
export class VerifyEmailDto {
    code;
    email;
    verificationToken;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    Length(6, 6, { message: 'Código deve ter 6 dígitos' }),
    __metadata("design:type", String)
], VerifyEmailDto.prototype, "code", void 0);
__decorate([
    IsEmail({}, { message: 'Email inválido' }),
    IsOptional(),
    __metadata("design:type", String)
], VerifyEmailDto.prototype, "email", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], VerifyEmailDto.prototype, "verificationToken", void 0);
export class ResendCodeDto {
    email;
    verificationToken;
}
__decorate([
    IsEmail({}, { message: 'Email inválido' }),
    IsNotEmpty(),
    __metadata("design:type", String)
], ResendCodeDto.prototype, "email", void 0);
__decorate([
    IsString(),
    IsOptional(),
    __metadata("design:type", String)
], ResendCodeDto.prototype, "verificationToken", void 0);
export class ForgotPasswordDto {
    email;
}
__decorate([
    IsEmail({}, { message: 'Email inválido' }),
    IsNotEmpty(),
    __metadata("design:type", String)
], ForgotPasswordDto.prototype, "email", void 0);
export class ResetPasswordDto {
    token;
    senha;
}
__decorate([
    IsString(),
    IsNotEmpty(),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "token", void 0);
__decorate([
    IsString(),
    MinLength(8, { message: 'Senha deve ter no mínimo 8 caracteres' }),
    MaxLength(72),
    __metadata("design:type", String)
], ResetPasswordDto.prototype, "senha", void 0);
//# sourceMappingURL=auth.dto.js.map