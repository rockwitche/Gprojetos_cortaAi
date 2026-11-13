import { PrismaService } from '../prisma/prisma.service.js';
import { type PlanoType } from '../plano/plano.config.js';
export declare class AgendamentoService {
    private prisma;
    constructor(prisma: PrismaService);
    private normalizeTelefone;
    contarAgendamentosMes(ownerId: string): Promise<{
        usado: number;
        limite: number;
        plano: PlanoType;
    }>;
    create(data: {
        data: string;
        horario: string;
        nomeCliente: string;
        telefoneCliente: string;
        barbeariaId: string;
        barbeiroId: string;
        servicoId: string;
        userId?: string;
    }): Promise<{
        message: string;
        agendamento: {
            barbearia: {
                id: string;
                nome: string;
                telefone: string | null;
                endereco: string;
            };
            barbeiro: {
                id: string;
                nome: string;
                foto: string | null;
            };
            servico: {
                id: string;
                nome: string;
                preco: number;
                duracao: number;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            data: string;
            barbeariaId: string;
            barbeiroId: string;
            horario: string;
            nomeCliente: string;
            telefoneCliente: string;
            servicoId: string;
            status: string;
            lembreteEnviado: boolean;
            userId: string | null;
        };
        guestAccessToken: string | null;
    }>;
    findByUser(userId: string): Promise<({
        barbearia: {
            id: string;
            nome: string;
            telefone: string | null;
            endereco: string;
            slug: string;
        };
        barbeiro: {
            id: string;
            nome: string;
            foto: string | null;
        };
        servico: {
            id: string;
            nome: string;
            preco: number;
            duracao: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: string;
        barbeariaId: string;
        barbeiroId: string;
        horario: string;
        nomeCliente: string;
        telefoneCliente: string;
        servicoId: string;
        status: string;
        guestTokenHash: string | null;
        lembreteEnviado: boolean;
        userId: string | null;
    })[]>;
    findByBarbearia(barbeariaId: string, ownerId: string): Promise<({
        barbeiro: {
            id: string;
            nome: string;
            foto: string | null;
        };
        servico: {
            id: string;
            nome: string;
            preco: number;
            duracao: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: string;
        barbeariaId: string;
        barbeiroId: string;
        horario: string;
        nomeCliente: string;
        telefoneCliente: string;
        servicoId: string;
        status: string;
        guestTokenHash: string | null;
        lembreteEnviado: boolean;
        userId: string | null;
    })[]>;
    findByOwner(ownerId: string, data?: string): Promise<({
        user: {
            id: string;
            nome: string;
            telefone: string | null;
            avatar: string | null;
        } | null;
        barbearia: {
            id: string;
            nome: string;
        };
        barbeiro: {
            id: string;
            nome: string;
            foto: string | null;
        };
        servico: {
            id: string;
            nome: string;
            preco: number;
            duracao: number;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: string;
        barbeariaId: string;
        barbeiroId: string;
        horario: string;
        nomeCliente: string;
        telefoneCliente: string;
        servicoId: string;
        status: string;
        guestTokenHash: string | null;
        lembreteEnviado: boolean;
        userId: string | null;
    })[]>;
    updateStatus(id: string, ownerId: string, status: 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO'): Promise<{
        message: string;
        agendamento: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            data: string;
            barbeariaId: string;
            barbeiroId: string;
            horario: string;
            nomeCliente: string;
            telefoneCliente: string;
            servicoId: string;
            status: string;
            guestTokenHash: string | null;
            lembreteEnviado: boolean;
            userId: string | null;
        };
    }>;
    cancelar(id: string, userId: string): Promise<{
        message: string;
        agendamento: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            data: string;
            barbeariaId: string;
            barbeiroId: string;
            horario: string;
            nomeCliente: string;
            telefoneCliente: string;
            servicoId: string;
            status: string;
            guestTokenHash: string | null;
            lembreteEnviado: boolean;
            userId: string | null;
        };
    }>;
    findByTelefone(telefone: string, comprovantes?: string[]): Promise<{
        barbearia: {
            id: string;
            nome: string;
            telefone: string | null;
            endereco: string;
            slug: string;
        };
        barbeiro: {
            id: string;
            nome: string;
            foto: string | null;
        };
        servico: {
            id: string;
            nome: string;
            preco: number;
            duracao: number;
        };
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: string;
        barbeariaId: string;
        barbeiroId: string;
        horario: string;
        nomeCliente: string;
        telefoneCliente: string;
        servicoId: string;
        status: string;
        lembreteEnviado: boolean;
        userId: string | null;
    }[]>;
    cancelarPorTelefone(id: string, telefone: string, comprovante?: string): Promise<{
        message: string;
    }>;
    findClientesByOwner(ownerId: string): Promise<any[]>;
    horariosOcupados(barbeiroId: string, data: string, duracao?: number): Promise<string[]>;
    findLembretesPendentes(ownerId: string): Promise<any[]>;
    marcarLembreteEnviado(id: string, ownerId: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        data: string;
        barbeariaId: string;
        barbeiroId: string;
        horario: string;
        nomeCliente: string;
        telefoneCliente: string;
        servicoId: string;
        status: string;
        guestTokenHash: string | null;
        lembreteEnviado: boolean;
        userId: string | null;
    }>;
}
