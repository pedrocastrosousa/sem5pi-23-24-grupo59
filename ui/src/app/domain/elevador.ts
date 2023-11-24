export interface Elevador {
    //numeroIdentificativo -> edificio + nº elevador
    numeroIdentificativo?: string;
    edificio: string;
    pisos: string[];
    numeroSerie?: string;
    marca?: string;
    modelo?: string;
    descricao?: string;
}  

