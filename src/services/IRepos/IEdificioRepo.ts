import { Repo } from "../../core/infra/Repo";
import { Edificio } from "../../domain/edificio/edificio";
import { CodigoEdificio } from "../../domain/edificio/codigoEdificio";

export default interface IEdificioRepo extends Repo<Edificio> {
  save(role: Edificio): Promise<Edificio>;
  findByDomainId (codigoEdificio: CodigoEdificio | string): Promise<Edificio>;
  findByDomain(Edificio: Edificio | string): Promise<Edificio> ;
  findAll(): Promise<Edificio[]>;
}