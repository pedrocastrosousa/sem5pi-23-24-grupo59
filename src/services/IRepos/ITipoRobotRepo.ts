import { Repo } from '../../core/infra/Repo';
import { TipoRobot } from '../../domain/tipoRobot/tipoRobot';
import { IdTipoRobot } from '../../domain/tipoRobot/idTipoRobot';

export default interface ITipoRobotRepo extends Repo<TipoRobot> {
  save(tipoRobot: TipoRobot): Promise<TipoRobot>;
  findByDomainId(idTipoRobot: IdTipoRobot | string): Promise<TipoRobot>;
}
