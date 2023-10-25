import { Edificio } from "../domain/edificio/edificio";

export interface IPisoPersistence {
    domainId: string;
    nome: string;
    descricao : string;
    edificio : Edificio;
  }