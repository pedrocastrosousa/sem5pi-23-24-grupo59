import { Repo } from "../../core/infra/Repo";
import { Piso } from "../../domain/piso/piso";
import { PisoId } from "../../domain/piso/pisoId";
import { PisoNome } from "../../domain/piso/pisoNome";


export default interface IPisoRepo extends Repo<Piso> {
	save(piso: Piso): Promise<Piso>;
	findByDomainId (pisoId: PisoId| string): Promise<Piso>;
}
  