export declare class CreateServicoDto {
    nome: string;
    preco: number;
    duracao: number;
    barbeiroId?: string;
}
export declare class UpdateServicoDto {
    nome?: string;
    preco?: number;
    duracao?: number;
    barbeiroId?: string;
    ativo?: boolean;
}
