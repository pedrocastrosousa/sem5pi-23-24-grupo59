import { Repo } from "../../core/infra/Repo";
import { Elevador } from "../../domain/elevador/elevador";

export default interface IelevadorRepo extends Repo<Elevador> {
	save(elevador: Elevador): Promise<Elevador>;
	findById (id: string): Promise<Elevador>;
	findByNumeroIdentificativo (numeroIdentificativo: string): Promise<Elevador>;
	getLastNumeroIdentificativoOfGivenEdificio(codigoEdificio: string): Promise<string>;
	findAll() : Promise<Array<Elevador>>;
}
