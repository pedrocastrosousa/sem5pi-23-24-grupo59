export interface ISalaPersistence {
    domainId: string;
    categoriaSala: string;
    dimensaoSala: {
        x1: number;
        y1: number;
        x2: number;
        y2: number;
    }
    descricaoSala: string;
}