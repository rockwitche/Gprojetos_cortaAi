var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
let BarberAuthGuard = class BarberAuthGuard extends AuthGuard('jwt') {
    async canActivate(context) {
        await super.canActivate(context);
        const req = context.switchToHttp().getRequest();
        if (req.user?.tipo !== 'BARBEIRO') {
            throw new ForbiddenException('Esta área é exclusiva para contas de barbeiro.');
        }
        return true;
    }
};
BarberAuthGuard = __decorate([
    Injectable()
], BarberAuthGuard);
export { BarberAuthGuard };
//# sourceMappingURL=barber-auth.guard.js.map