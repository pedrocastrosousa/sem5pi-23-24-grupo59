import ITamanhoMapaDTO from "./ITamanhoMapaDTO";

export default interface IMapaDTO {
    mapa: {
        codigoPiso: string,
        codigoEdificio: string,
        tamanho: ITamanhoMapaDTO,
        salas: Object[],
        elevador: Object,
        passagens: Object[]
    },
    ground: Object,
    wall: Object,
    player: Object,
}