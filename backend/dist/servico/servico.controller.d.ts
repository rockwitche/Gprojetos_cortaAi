import type { Request } from 'express';
import { ServicoService } from './servico.service.js';
import { CreateServicoDto, UpdateServicoDto } from './dto/servico.dto.js';
export declare class ServicoController {
    private readonly service;
    constructor(service: ServicoService);
    findAll(barbeariaId: string): Promise<{
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
    create(barbeariaId: string, req: Request, dto: CreateServicoDto): Promise<{
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
    update(id: string, req: Request, dto: UpdateServicoDto): Promise<{
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
    remove(id: string, req: Request): Promise<{
        message: string;
    }>;
}
