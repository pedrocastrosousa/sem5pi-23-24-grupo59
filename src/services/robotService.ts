import { Service, Inject } from 'typedi';
import config from "../../config";
import { IRobotDTO } from '../dto/IRobotDTO';
import { Robot } from '../domain/robot/robot';

import { RobotMap } from '../mappers/RobotMap';
import { Result } from "../core/logic/Result";


import { Edificio } from '../domain/edificio/edificio';
import { Piso } from '../domain/piso/piso';

import { DescricaoRobot } from '../domain/robot/descricaoRobot';
import ITipoRobotRepo from './IRepos/ITipoRobotRepo';
import { CodigoRobot } from '../domain/robot/codigoRobot';
import { NicknameRobot } from '../domain/robot/nicknameRobot';
import { NumeroSerieRobot } from '../domain/robot/numeroSerieRobot';
import { TipoRobot } from '../domain/tipoRobot/tipoRobot';
import IRobotService from './IServices/IRobotService';
import { EstadoRobot } from '../domain/robot/estadoRobot';
import IRobotRepo from './IRepos/IRobotRepo';

@Service()
export default class RobotService implements IRobotService {
  constructor(
    @Inject(config.repos.robot.name) private robotRepo: IRobotRepo,
    @Inject(config.repos.tipoRobot.name) private tipoRobotRepo: ITipoRobotRepo
  ) { }

  public async createRobot(robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {

      const codigo = await CodigoRobot.create(robotDTO.numeroSerie).getValue();
      const nickname = await NicknameRobot.create(robotDTO.nickname).getValue();
      const numeroSerie = await NumeroSerieRobot.create(robotDTO.numeroSerie).getValue();
      const descricao = await DescricaoRobot.create(robotDTO.descricao).getValue();
      const tipoRobotOrError = await this.getTipoRobot(robotDTO.tipo);

      const RobotOrError = Robot.create({
        codigoRobot: codigo,
        nicknameRobot: nickname,
        tipoRobot: tipoRobotOrError.getValue(),
        numeroserieRobot: numeroSerie,
        descricaoRobot: descricao,
        estadoRobot: EstadoRobot.Ativo
      });



      if (RobotOrError.isFailure) {
        return Result.fail<IRobotDTO>(RobotOrError.errorValue());
      }

      const RobotResult = RobotOrError.getValue();


      await this.robotRepo.save(RobotResult);
      const RobotDTOResult = RobotMap.toDTO(RobotResult) as IRobotDTO;
      return Result.ok<IRobotDTO>(RobotDTOResult)


    } catch (e) {
      throw e;
    }

  }


  private async getTipoRobot(tipoRobotId: string): Promise<Result<TipoRobot>> {

    const tipo = await this.tipoRobotRepo.findByDesignation(tipoRobotId);
    const found = !!tipo;
    if (found) {
      return Result.ok<TipoRobot>(tipo);
    } else {
      return Result.fail<TipoRobot>("Não foi possivel encontrar o Tipo de Robot" + tipoRobotId);
    }
  }


  public async getRobots(): Promise<Result<IRobotDTO[]>> {
    try {
      const RobotList: Robot[] = await this.robotRepo.findAll();
      let RobotListDto: IRobotDTO[] = [];
      if (RobotList != null) {
        for (let i = 0; i < RobotList.length; i++) {
          RobotListDto.push(RobotMap.toDTO(RobotList[i]));
        }
        return Result.ok<IRobotDTO[]>(RobotListDto);
      }

      return Result.fail<IRobotDTO[]>("Não existem Robots para listar.");
    } catch (e) {
      throw e;
    }
  }



  public async inibirRobot(robotID: string, robotDTO: IRobotDTO): Promise<Result<IRobotDTO>> {
    try {

      if (!robotID) {
        return Result.fail<IRobotDTO>('ID do robot não fornecido para atualização.');
      }

      const existingRobot = await this.robotRepo.findByCodigo(robotID);

      if (existingRobot != null) {

        existingRobot.updateEstado(await EstadoRobot.Inibido);

        await this.robotRepo.save(existingRobot);
        return Result.ok<IRobotDTO>(RobotMap.toDTO(existingRobot));
      }


      return Result.fail<IRobotDTO>('Não foi possível encontrar o robot.');
    } catch (e) {
      return Result.fail<IRobotDTO>(e.message);
    }
  }

  public async delete(codigo: string) {
    try {
      await this.robotRepo.delete(codigo);
    } catch (e) {
      throw e;
    }
  }
  /*

  private async getEdificio(edificioId: string): Promise<Result<Edificio>> {

    const edificio = await this.edificioRepo.findByDomainId(edificioId);
    const found = !!edificio;

    if (found) {
      return Result.ok<Edificio>(edificio);
    } else {
      return Result.fail<Edificio>("Não foi possivel encontrar o edificio pelo nome" + edificioId);
    }
  }


}
*/

}