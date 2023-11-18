/* eslint-disable prettier/prettier */
export interface Edificio{
    codigoEdificio: string;
    descricaoEdificio: string;
    nomeEdificio: string;
    dimensaoMaximaPisos: {
        comprimento: number;
        largura: number;
    }
}