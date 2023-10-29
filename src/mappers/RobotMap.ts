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
      codigo: robot.codigoRobot.value,
      nickname: robot.nicknameRobot.value,
      tipo: robot.tipoRobot.designacaoTipoRobot.designacao,
      numeroSerie: robot.numeroserieRobot.value,
      descricao: robot.descricaoRobot.value,
      estado: robot.estadoRobot.toString(),
    } as IRobotDTO;
  }

  public static async toDomain(raw: any): Promise<Robot> {
    const repoTipoRobot = Container.get(TipoRobotRepo);

    const tipoOrError = await repoTipoRobot.findByDesignation(raw.tipo);
    if (!tipoOrError) {
      throw new Error("Tipo de Robot não encontrado");
    }

    const codigoOrError = CodigoRobot.create(raw.codigo).getValue();
    const nicknameOrError = NicknameRobot.create(raw.nickname).getValue();
    const numeroSerieOrError = NumeroSerieRobot.create(raw.numeroSerie).getValue();
    const descricaoOrError = raw.descricao ? DescricaoRobot.create(raw.descricao).getValue() : undefined;
    const estadoOrError = raw.estado;
    const robotOrError = Robot.create({
      codigoRobot: codigoOrError,
      nicknameRobot: nicknameOrError,
      tipoRobot: tipoOrError,
      numeroserieRobot: numeroSerieOrError,
      descricaoRobot: descricaoOrError,
      estadoRobot: estadoOrError
    }
      , new UniqueEntityID(raw.domainId));

    robotOrError.isFailure ? console.log(robotOrError.error) : "";
    return robotOrError.isSuccess ? robotOrError.getValue() : null;

  }


  public static toPersistence(robot: Robot): any {
    const a = {
      id: robot.id.toString(),
      codigo: robot.codigoRobot.value,
      nickname: robot.nicknameRobot.value,
      tipo: robot.tipoRobot.designacaoTipoRobot.designacao,
      numeroSerie: robot.numeroserieRobot.value,
      descricao: robot.descricaoRobot.value,
      estado: robot.estadoRobot.toString(),
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

