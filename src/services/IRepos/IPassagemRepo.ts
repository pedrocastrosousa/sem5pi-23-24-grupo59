import { Repo } from "../../core/infra/Repo";
import { Passagem } from "../../domain/passagem/passagem";

export default interface IPassagemRepo extends Repo<Passagem> {
	save(passagem: Passagem): Promise<Passagem>;
	findById (id: string): Promise<Passagem>;
}