import { BuscarMapaDto } from './dto/buscar-mapa.dto.js';
export declare class MapaService {
    buscar(dto: BuscarMapaDto): Promise<{
        resultados: {
            latitude: number;
            longitude: number;
            nome: string;
        }[];
    }>;
}
