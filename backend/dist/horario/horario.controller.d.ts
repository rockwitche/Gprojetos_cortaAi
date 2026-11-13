import { HorarioService } from './horario.service.js';
import type { Request } from 'express';
export declare class HorarioController {
    private horarioService;
    constructor(horarioService: HorarioService);
    findAll(barbeiroId: string): Promise<{
        id: string;
        barbeiroId: string;
        diaSemana: number;
        horaInicio: string;
        horaFim: string;
        almocoInicio: string | null;
        almocoFim: string | null;
    }[]>;
    setHorarios(barbeiroId: string, body: {
        horarios: {
            diaSemana: number;
            horaInicio: string;
            horaFim: string;
            almocoInicio?: string;
            almocoFim?: string;
        }[];
    }, req: Request): Promise<{
        message: string;
        horarios: {
            id: string;
            barbeiroId: string;
            diaSemana: number;
            horaInicio: string;
            horaFim: string;
            almocoInicio: string | null;
            almocoFim: string | null;
        }[];
    }>;
}
