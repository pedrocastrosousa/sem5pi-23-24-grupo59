import { Edificio } from "../domain/edificio/edificio";

export interface IPisoDTO {
  id: string;
  nome: string;
  descricao: string;
  edificio: string;
}
