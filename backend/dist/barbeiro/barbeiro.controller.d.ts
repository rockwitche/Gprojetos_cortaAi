import type { Request } from 'express';
import { BarbeiroService } from './barbeiro.service.js';
import { CreateBarbeiroDto, UpdateBarbeiroDto } from './dto/barbeiro.dto.js';
export declare class BarbeiroController {
    private readonly service;
    constructor(service: BarbeiroService);
    findAll(barbeariaId: string): Promise<({
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
    create(barbeariaId: string, req: Request, dto: CreateBarbeiroDto): Promise<{
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
    update(id: string, req: Request, dto: UpdateBarbeiroDto): Promise<{
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
    remove(id: string, req: Request): Promise<{
        message: string;
    }>;
}
