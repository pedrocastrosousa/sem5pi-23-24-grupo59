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
        return res.status(404).send();
      }

      const tipoRobotDTO = tipoRobotOrError.getValue();
       return res.status(201).json(tipoRobotDTO);
    } catch (e) {
      return next(e);
    }
  };

  public async getAllTipoRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const tipoRobotsOrError = await this.tipoRobotInstance.getAllTipoRobots();

      if (tipoRobotsOrError.isFailure) {
        return res.status(404).send();
      }

      const tipoRobotsDTO = tipoRobotsOrError.getValue();
      return res.json(tipoRobotsDTO).status(200);
    } catch (e) {
      return res.json(e.message).status(400);
    }
  };
}
