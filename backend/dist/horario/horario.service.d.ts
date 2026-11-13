import { PrismaService } from '../prisma/prisma.service.js';
interface HorarioData {
    diaSemana: number;
    horaInicio: string;
    horaFim: string;
    almocoInicio?: string;
    almocoFim?: string;
}
export declare class HorarioService {
    private prisma;
    constructor(prisma: PrismaService);
    private verificarDonoBarbeiro;
    setHorarios(barbeiroId: string, ownerId: string, horarios: HorarioData[]): Promise<{
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
    findByBarbeiro(barbeiroId: string): Promise<{
        id: string;
        barbeiroId: string;
        diaSemana: number;
        horaInicio: string;
        horaFim: string;
        almocoInicio: string | null;
        almocoFim: string | null;
    }[]>;
}
export {};
