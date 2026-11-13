import { ExecutionContext } from '@nestjs/common';
declare const BarberAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class BarberAuthGuard extends BarberAuthGuard_base {
    canActivate(context: ExecutionContext): Promise<boolean>;
}
export {};
