import { Repo } from "../../core/infra/Repo";
import { Edificio } from "../../domain/edificio/edificio";
import { EdificioId } from "../../domain/edificio/edificioId";

export default interface IEdificioRepo extends Repo<Edificio> {
  save(role: Edificio): Promise<Edificio>;
  findByDomainId (edificioId: EdificioId | string): Promise<Edificio>;
  findAll(): Promise<Edificio[]>;
}