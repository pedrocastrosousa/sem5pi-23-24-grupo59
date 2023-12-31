import { FilterQuery } from "mongoose";
import { Repo } from "../../core/infra/Repo";
import { Piso } from "../../domain/piso/piso";
import { PisoId } from "../../domain/piso/pisoId";

export default interface IPisoRepo extends Repo<Piso> {
	save(piso: Piso): Promise<Piso>;
	
	findByDomainId (pisoId: PisoId| string): Promise<Piso>;
	findByNomePiso(nome: string): Promise<Piso>
	findEdificiosByPisoCountRange(minCount: number, maxCount: number): Promise<string[]>
	findByCodigo(codigoPiso: string): Promise<Piso>
	findPisosComPassagensPorEdificio(edificio: string): Promise<string[]>
	findAll() : Promise<Array<Piso>>;
	update(filter: FilterQuery<Piso>, piso: Partial<Piso>);
	delete(codigoPiso: string);
	findAllMapas(): Promise<string[]>;
}
  