import { Result } from "../../core/logic/Result";
import { IRobotDTO } from "../../dto/IRobotDTO";

export default interface IRobotService  {
    createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
    getRobots(): Promise<Result<Array<IRobotDTO>>>;
    inibirRobot(robotId: string, robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
    reativarRobot(robotId: string, robotDTO: IRobotDTO): Promise<Result<IRobotDTO>>;
    delete(codigoRobot: string);
  }