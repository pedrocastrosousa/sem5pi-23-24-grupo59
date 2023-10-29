import { Repo } from "../../core/infra/Repo";
import { Robot } from "../../domain/robot/robot";

export default interface IelevadorRepo extends Repo<Robot> {
	save(robot: Robot): Promise<Robot>;
	findById (id: string): Promise<Robot>;
	findAll() : Promise<Array<Robot>>;
}