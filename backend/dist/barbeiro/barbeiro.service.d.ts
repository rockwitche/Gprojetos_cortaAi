import { PrismaService } from '../prisma/prisma.service.js';
import { CreateBarbeiroDto, UpdateBarbeiroDto } from './dto/barbeiro.dto.js';
export declare class BarbeiroService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByBarbearia(barbeariaId: string): Promise<({
        servicos: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
            barbeariaId: string;
            ativo: boolean;
            preco: number;
            duracao: number;
            barbeiroId: string | null;
        }[];
    } & {
        id: string;
        nome: string;
        createdAt: Date;
        updatedAt: Date;
        foto: string | null;
        barbeariaId: string;
        ativo: boolean;
    })[]>;
    create(barbeariaId: string, ownerId: string, dto: CreateBarbeiroDto): Promise<{
        message: string;
        barbeiro: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
            foto: string | null;
            barbeariaId: string;
            ativo: boolean;
        };
    }>;
    update(id: string, ownerId: string, dto: UpdateBarbeiroDto): Promise<{
        message: string;
        barbeiro: {
            id: string;
            nome: string;
            createdAt: Date;
            updatedAt: Date;
            foto: string | null;
            barbeariaId: string;
            ativo: boolean;
        };
    }>;
    remove(id: string, ownerId: string): Promise<{
        message: string;
    }>;
    private verificarDonoDaBarbearia;
    private verificarDonoDoBarbeiro;
}
