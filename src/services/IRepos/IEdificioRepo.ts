import { Repo } from '../../core/infra/Repo';
import { CodigoEdificio } from '../../domain/edificio/codigoEdificio';
import { Edificio } from '../../domain/edificio/edificio';

export default interface IEdificioRepo extends Repo<Edificio> {
  save(role: Edificio): Promise<Edificio>;
  findAll(): Promise<Edificio[]>;
  findByCodigo(edificioCodigo: CodigoEdificio | string): Promise<Edificio>;
}
