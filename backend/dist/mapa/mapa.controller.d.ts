import { BuscarMapaDto } from './dto/buscar-mapa.dto.js';
import { MapaService } from './mapa.service.js';
export declare class MapaController {
    private readonly mapaService;
    constructor(mapaService: MapaService);
    buscar(dto: BuscarMapaDto): Promise<{
        resultados: {
            latitude: number;
            longitude: number;
            nome: string;
        }[];
    }>;
}
