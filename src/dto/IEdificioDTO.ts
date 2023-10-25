export default interface IEdificioDTO{
    id: string;
    codigoEdificio: string;
    descricaoEdificio: string;
    nomeEdificio: string;
    dimensaoMaximaPisos: {
        comprimento: number;
        largura: number;
    }
}