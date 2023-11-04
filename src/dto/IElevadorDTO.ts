export interface IElevadorDTO{
    id: string;
    numeroIdentificativo: string;
    edificio: string;
    pisos: string[];
    numeroSerie?: string;
    marca?: string;
    modelo?: string;
    descricao?: string;
}
