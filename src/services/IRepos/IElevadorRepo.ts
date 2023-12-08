import { Repo } from "../../core/infra/Repo";
import { Elevador } from "../../domain/elevador/elevador";

export default interface IelevadorRepo extends Repo<Elevador> {
	save(elevador: Elevador): Promise<Elevador>;
	delete(numeroIdentificativo: string);
	findById (id: string): Promise<Elevador>;
	findByNumeroIdentificativo (numeroIdentificativo: string): Promise<Elevador>;
	getLastNumeroIdentificativoOfGivenEdificio(codigoEdificio: string): Promise<string>;
	findAll() : Promise<Array<Elevador>>;
	findAllByEdificio(codigoEdificio: string): Promise<Array<Elevador>>;
}
