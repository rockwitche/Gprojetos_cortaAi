import { Module } from '@nestjs/common';
import { AgendamentoController } from './agendamento.controller.js';
import { AgendamentoService } from './agendamento.service.js';
import { PrismaModule } from '../prisma/prisma.module.js';

@Module({
  imports: [PrismaModule],
  controllers: [AgendamentoController],
  providers: [AgendamentoService],
})
export class AgendamentoModule {}
