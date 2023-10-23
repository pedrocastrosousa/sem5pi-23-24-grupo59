export interface IEdificioPersistence {
    id: string;
    descricaoEdificio: string;
    nomeEdificio: string;
    dimensaoMaximaPisos: {
        comprimento: number;
        largura: number;
    }
}