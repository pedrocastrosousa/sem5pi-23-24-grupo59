import { Repo } from "../../core/infra/Repo";
import { Elevador } from "../../domain/elevador/elevador";

export default interface IelevadorRepo extends Repo<Elevador> {
	save(elevador: Elevador): Promise<Elevador>;
	findById (id: string): Promise<Elevador>;
	findAll() : Promise<Array<Elevador>>;
}