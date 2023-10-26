import { Repo } from "../../core/infra/Repo";
import { Piso } from "../../domain/piso/piso";
import { PisoId } from "../../domain/piso/pisoId";

export default interface IPisoRepo extends Repo<Piso> {
	save(piso: Piso): Promise<Piso>;
	findByDomainId (pisoId: PisoId| string): Promise<Piso>;
	findByNomePiso(nome: string): Promise<Piso>
}
  