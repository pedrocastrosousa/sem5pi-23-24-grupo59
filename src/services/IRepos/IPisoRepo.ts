import { Repo } from "../../core/infra/Repo";
import { Piso } from "../../domain/piso/piso";
import { PisoNome } from "../../domain/piso/pisoNome";


export default interface IPisoRepo extends Repo<Piso> {
	save(piso: Piso): Promise<Piso>;
	findById (pisoNome: PisoNome | string): Promise<Piso>;
}
  