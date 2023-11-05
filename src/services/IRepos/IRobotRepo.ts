import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot/robot";

export default interface IRobotRepo extends Repo<Robot> {
	save(robot: Robot): Promise<Robot>;
	findById (id: string): Promise<Robot>;
	findAll() : Promise<Array<Robot>>;
	findByCodigo(codigo: string): Promise<Robot>;
	delete(codigo: string): Promise<void>;
}