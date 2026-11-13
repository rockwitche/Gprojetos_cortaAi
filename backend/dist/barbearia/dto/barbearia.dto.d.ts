export declare class CreateBarbeariaDto {
    nome: string;
    endereco: string;
    cidade: string;
    estado: string;
    descricao?: string;
    cep?: string;
    pontoReferencia?: string;
    latitude?: number;
    longitude?: number;
    telefone?: string;
    whatsapp?: string;
    mensagemLembrete?: string;
    lembreteAtivo?: boolean;
    foto?: string;
    fotos?: string[];
    ativa?: boolean;
}
export declare class UpdateBarbeariaDto {
    nome?: string;
    endereco?: string;
    cidade?: string;
    estado?: string;
    descricao?: string;
    cep?: string;
    pontoReferencia?: string;
    latitude?: number;
    longitude?: number;
    telefone?: string;
    whatsapp?: string;
    mensagemLembrete?: string;
    lembreteAtivo?: boolean;
    foto?: string;
    fotos?: string[];
    ativa?: boolean;
}
