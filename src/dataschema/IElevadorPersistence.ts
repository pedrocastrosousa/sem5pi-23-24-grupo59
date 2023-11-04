export interface IElevadorPersistence{
    id: string;
    numeroIdentificativo: string;
    edificio: string;
    pisos: string[];
    numeroSerie?: string;
    marca?: string;
    modelo?: string;
    descricao?: string;
  }
