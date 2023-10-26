export interface IElevadorDTO{
    id: string;
    edificio: string;
    pisos: string[];
    numeroSerie: string;
    marca?: string;
    modelo?: string;
    descricao?: string;
}
