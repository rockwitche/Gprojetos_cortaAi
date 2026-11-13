var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Module } from '@nestjs/common';
import { HorarioController } from './horario.controller.js';
import { HorarioService } from './horario.service.js';
let HorarioModule = class HorarioModule {
};
HorarioModule = __decorate([
    Module({
        controllers: [HorarioController],
        providers: [HorarioService],
        exports: [HorarioService],
    })
], HorarioModule);
export { HorarioModule };
//# sourceMappingURL=horario.module.js.map