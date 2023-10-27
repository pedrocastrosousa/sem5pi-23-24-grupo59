import { Repo } from "../../core/infra/Repo";
import { Passagem } from "../../domain/passagem/passagem";
import { PassagemId } from "../../domain/passagem/passagemId";

export default interface IPassagemRepo extends Repo<Passagem> {
	save(passagem: Passagem): Promise<Passagem>;
	findAll() : Promise<Array<Passagem>>;
	findByDomainId (passagemId: PassagemId| string): Promise<Passagem>;
	findById (_id: string): Promise<Passagem>;
	findByCodigo(codigo: string): Promise<Passagem>;
	findAllByEdificio(edificio1: string, edificio2 :string): Promise<string[]>;
}