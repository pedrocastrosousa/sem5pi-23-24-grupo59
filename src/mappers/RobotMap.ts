import { Robot } from "../domain/robot/robot";
import { Mapper } from "../core/infra/Mapper";
import { IRobotDTO } from "../dto/IRobotDTO";
import { Container } from 'typedi';
import EdificioRepo from "../repos/edificioRepo";
import PisosRepo from "../repos/pisoRepo";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { DescricaoRobot } from "../domain/robot/descricaoRobot";
import { CodigoRobot } from "../domain/robot/codigoRobot";
import { NicknameRobot } from "../domain/robot/nicknameRobot";
import { TipoRobot } from "../domain/tipoRobot/tipoRobot";
import TipoRobotRepo from "../repos/tipoRobotRepo";
import { NumeroSerieRobot } from "../domain/robot/numeroSerieRobot";

export class RobotMap extends Mapper<Robot> {

  public static toDTO(robot: Robot): IRobotDTO {
    return {
      id: robot.id.toString(),
      codigoRobot: robot.codigoRobot.toString(),
      nicknameRobot: robot.nicknameRobot,
      tipoRobot: robot.tipoRobot.designacaoTipoRobot,
      numeroSerieRobot: robot.numeroserieRobot,
      descricaoRobot: robot.descricaoRobot,
      estadoRobot: robot.estadoRobot.toString(),
    } as unknown as IRobotDTO;
  }

  public static async toDomain(raw: any): Promise<Robot> {
    const repoTipoRobot = Container.get(TipoRobotRepo);
    const tipoOrError = await repoTipoRobot.findByDesignation(raw.tipoRobot);
    if (!tipoOrError) {
      throw new Error("Tipo de Robot não encontrado");
    }

    const codigoOrError = CodigoRobot.create(raw.codigoRobot).getValue();
    const nicknameOrError = NicknameRobot.create(raw.nicknameRobot).getValue();
    const numeroSerieOrError = NumeroSerieRobot.create(raw.numeroSerieRobot).getValue();
    const descricaoOrError = raw.descricao ? DescricaoRobot.create(raw.descricaoRobot).getValue() : undefined;
    const estadoOrError = raw.estadoRobot;
    const robotOrError = Robot.create({
      codigoRobot: codigoOrError,
      nicknameRobot: nicknameOrError,
      tipoRobot: tipoOrError,
      numeroserieRobot: numeroSerieOrError,
      descricaoRobot: descricaoOrError,
      estadoRobot: estadoOrError
    }
    );
    robotOrError.isFailure ? console.log(robotOrError.error) : "";
    return robotOrError.isSuccess ? robotOrError.getValue() : null;

  }


  public static toPersistence(robot: Robot): any {
    const a = {
      codigoRobot: robot.codigoRobot.toString(),
      nicknameRobot: robot.nicknameRobot,
      tipoRobot: robot.tipoRobot.designacaoTipoRobot.designacao,
      numeroSerieRobot: robot.numeroserieRobot,
      descricaoRobot: robot.descricaoRobot,
      estadoRobot: robot.estadoRobot.toString(),
    }
    return a;
  }


  public static async toDomainBulk(rawList: any[]): Promise<Robot[]> {
    const robots: Robot[] = [];

    for (const raw of rawList) {
      const robot = await this.toDomain(raw);
      if (robot) {
        robots.push(robot);
      }
    }

    return robots;
  }
}

