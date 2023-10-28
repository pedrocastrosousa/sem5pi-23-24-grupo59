import { Repo } from "../../core/infra/Repo";
import { CodigoEdificio } from "../../domain/edificio/codigoEdificio";
import { Edificio } from "../../domain/edificio/edificio";
import { EdificioId } from "../../domain/edificio/edificioId";

export default interface IEdificioRepo extends Repo<Edificio> {
  save(role: Edificio): Promise<Edificio>;
  findByDomainId (edificioId: EdificioId | string): Promise<Edificio>;
  findAll(): Promise<Edificio[]>;
  findByCodigo (edificioCodigo: CodigoEdificio | string): Promise<Edificio>;

}