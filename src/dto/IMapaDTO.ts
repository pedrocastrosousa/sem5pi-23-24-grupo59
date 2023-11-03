import ITamanhoMapaDTO from "./ITamanhoMapaDTO";

export default interface IMapaDTO{
    codigoPiso: string,
    codigoEdificio: string,
    tamanho: ITamanhoMapaDTO,
    paredes: Object[],
    salas: Object[],
    elevador: Object,
    passagens: Object[]
}