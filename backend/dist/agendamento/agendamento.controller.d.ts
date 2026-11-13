import { CreateAgendamentoDto, ConsultaAgendamentosDto } from './agendamento.dto.js';
import { AgendamentoService } from './agendamento.service.js';
import type { Request } from 'express';
export declare class AgendamentoController {
    private agendamentoService;
    constructor(agendamentoService: AgendamentoService);
    create(body: CreateAgendamentoDto, req: Request): Promise<{
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
    meus(req: Request): Promise<({
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
    usoMensal(req: Request): Promise<{
        usado: number;
        limite: number;
        plano: import("../plano/plano.config.js").PlanoType;
    }>;
    agenda(req: Request, params: any): Promise<({
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
    consultarPorTelefone(body: ConsultaAgendamentosDto): Promise<{
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
    cancelarPorTelefone(id: string, telefone: string, comprovante: string): Promise<{
        message: string;
    }>;
    horariosOcupados(barbeiroId: string, req: Request, duracao?: number): Promise<string[]>;
    porBarbearia(barbeariaId: string, req: Request): Promise<({
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
    updateStatus(id: string, status: 'CONFIRMADO' | 'CANCELADO' | 'CONCLUIDO', req: Request): Promise<{
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
    cancelar(id: string, req: Request): Promise<{
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
    lembretesPendentes(req: Request): Promise<any[]>;
    clientes(req: Request): Promise<any[]>;
    marcarLembreteEnviado(id: string, req: Request): Promise<{
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
