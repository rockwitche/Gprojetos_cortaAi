import { PrismaService } from '../prisma/prisma.service.js';
import { CreateServicoDto, UpdateServicoDto } from './dto/servico.dto.js';
export declare class ServicoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByBarbearia(barbeariaId: string): Promise<{
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        barbeariaId: string;
        ativo: boolean;
        preco: number;
        duracao: number;
        barbeiroId: string | null;
    }[]>;
    create(barbeariaId: string, ownerId: string, dto: CreateServicoDto): Promise<{
        message: string;
        servico: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
            barbeariaId: string;
            ativo: boolean;
            preco: number;
            duracao: number;
            barbeiroId: string | null;
        };
    }>;
    update(id: string, ownerId: string, dto: UpdateServicoDto): Promise<{
        message: string;
        servico: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
            barbeariaId: string;
            ativo: boolean;
            preco: number;
            duracao: number;
            barbeiroId: string | null;
        };
    }>;
    remove(id: string, ownerId: string): Promise<{
        message: string;
    }>;
    private verificarDonoDaBarbearia;
    private validarBarbeiro;
}
