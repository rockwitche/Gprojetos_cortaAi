var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BadGatewayException, Injectable } from '@nestjs/common';
let MapaService = class MapaService {
    async buscar(dto) {
        const partes = [dto.endereco, dto.cep, dto.cidade, dto.estado, 'Brasil']
            .filter((parte) => Boolean(parte?.trim()))
            .map((parte) => parte.trim());
        const url = new URL('https://nominatim.openstreetmap.org/search');
        url.search = new URLSearchParams({
            q: partes.join(', '),
            format: 'jsonv2',
            limit: '1',
            countrycodes: 'br',
            addressdetails: '1',
        }).toString();
        let resposta;
        try {
            resposta = await fetch(url, {
                headers: {
                    Accept: 'application/json',
                    'Accept-Language': 'pt-BR',
                    'User-Agent': 'CortaAi/1.0 (geocoding)',
                },
                signal: AbortSignal.timeout(10_000),
            });
        }
        catch {
            throw new BadGatewayException('Não foi possível consultar o serviço de mapas.');
        }
        if (!resposta.ok) {
            throw new BadGatewayException('O serviço de mapas está indisponível no momento.');
        }
        const resultados = (await resposta.json());
        return {
            resultados: resultados
                .map((resultado) => ({
                latitude: Number(resultado.lat),
                longitude: Number(resultado.lon),
                nome: resultado.display_name,
            }))
                .filter((resultado) => Number.isFinite(resultado.latitude) && Number.isFinite(resultado.longitude)),
        };
    }
};
MapaService = __decorate([
    Injectable()
], MapaService);
export { MapaService };
//# sourceMappingURL=mapa.service.js.map