import { Repo } from "../../core/infra/Repo";
import { Passagem } from "../../domain/passagem/passagem";
import { PassagemId } from "../../domain/passagem/passagemId";

export default interface IPassagemRepo extends Repo<Passagem> {
	save(passagem: Passagem): Promise<Passagem>;
	findByDomainId (passagemId: PassagemId| string): Promise<Passagem>;
}