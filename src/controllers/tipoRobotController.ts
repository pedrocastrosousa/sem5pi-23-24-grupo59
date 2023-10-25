import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import ITipoRobotController from './IControllers/ITipoRobotController';

import { Result } from '../core/logic/Result';
import ITipoRobotService from '../services/IServices/ITipoRobotService';
import ITipoRobotDTO from '../dto/ITipoRobotDTO';

@Service()
export default class TipoRobotController
  implements ITipoRobotController /* TODO: extends ../core/infra/BaseController */ {
  constructor(@Inject(config.services.tipoRobot.name) private tipoRobotInstance: ITipoRobotService) {}
 
  public async createTipoRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoRobotOrError = (await this.tipoRobotInstance.createTipoRobot(req.body as ITipoRobotDTO)) as Result<
      ITipoRobotDTO
      >;

      if (tipoRobotOrError.isFailure) {
        return res.status(402).send();
      }

      const tipoRobotDTO = tipoRobotOrError.getValue();
      return res.json(tipoRobotDTO).status(201);
    } catch (e) {
      return next(e);
    }
  };
}
