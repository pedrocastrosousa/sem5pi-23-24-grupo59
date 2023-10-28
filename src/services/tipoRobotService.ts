import { Service, Inject } from 'typedi';
import config from '../../config';
import ITipoRobotDTO from '../dto/ITipoRobotDTO';
import { TipoRobot } from '../domain/tipoRobot/tipoRobot';
import ITipoRobotRepo from '../services/IRepos/ITipoRobotRepo';
import ITipoRobotService from './IServices/ITipoRobotService';
import { Result } from '../core/logic/Result';
import { DesignacaoTipoRobot } from '../domain/tipoRobot/designacaoTipoRobot';
import { TipoTarefaTipoRobot } from '../domain/tipoRobot/tipoTarefaTipoRobot';
import { TipoRobotMap } from '../mappers/TipoRobotMap';

@Service()
export default class TipoRobotService implements ITipoRobotService {
  constructor(@Inject(config.repos.tipoRobot.name) private tipoRobotRepo: ITipoRobotRepo) {}

  public async createTipoRobot(tipoRobotDTO: ITipoRobotDTO): Promise<Result<ITipoRobotDTO>> {
    try {
      const designacaoTipoRobot = await DesignacaoTipoRobot.create(tipoRobotDTO.designacaoTipoRobot).getValue();
      const tipoTarefaTipoRobot = await TipoTarefaTipoRobot.create(tipoRobotDTO.tipoTarefaTipoRobot).getValue();
      const tipoRobotOrError = TipoRobot.create({
        designacaoTipoRobot: designacaoTipoRobot,
        tipoTarefaTipoRobot: tipoTarefaTipoRobot
      });

      if (tipoRobotOrError.isFailure) {
        return Result.fail<ITipoRobotDTO>(tipoRobotOrError.errorValue());
      }
      
      const tipoRobotResult = tipoRobotOrError.getValue();

      await this.tipoRobotRepo.save(tipoRobotResult);
      
      const tipoRobotDTOResult = TipoRobotMap.toDTO(tipoRobotResult) as ITipoRobotDTO;

      return Result.ok<ITipoRobotDTO>(tipoRobotDTOResult);
    } catch (e) {
      throw e;
    }
  }
}
