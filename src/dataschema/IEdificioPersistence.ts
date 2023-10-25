export interface IEdificioPersistence {
    domainId: string;
    codigoEdificio: string;
    descricaoEdificio: string;
    nomeEdificio: string;
    dimensaoMaximaPisos: {
        comprimento: number;
        largura: number;
    }
}