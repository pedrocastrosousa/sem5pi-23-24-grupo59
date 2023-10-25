export default interface IEdificioDTO{
    codigoEdificio: string;
    descricaoEdificio: string;
    nomeEdificio: string;
    dimensaoMaximaPisos: {
        comprimento: number;
        largura: number;
    }
}