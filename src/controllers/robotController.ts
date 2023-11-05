import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import IRobotController from './IControllers/IRobotController';
import { IRobotDTO } from '../dto/IRobotDTO';
import { Result } from "../core/logic/Result";
import IRobotService from '../services/IServices/IRobotService';


@Service()
export default class RobotController implements IRobotController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.robot.name) private robotServiceInstance: IRobotService
  ) { }

  public async createRobot(req: Request, res: Response, next: NextFunction) {
    try {
      const robotOrError = await this.robotServiceInstance.createRobot(req.body as IRobotDTO) as Result<IRobotDTO>;

      if (robotOrError.isFailure) {
        return res.status(400).json({ error: robotOrError.error});
      }

      const robotDTO = robotOrError.getValue();
      return res.json(robotDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  }

  public async listarRobots(req: Request, res: Response, next: NextFunction) {
    try {
      const robotListOrError = await this.robotServiceInstance.getRobots();
      if (robotListOrError.isFailure) {
        return res.status(400).send();
      }
      return res.json(robotListOrError.getValue()).status(200);
    }
    catch (e) {
      return res.json(e.message).status(400);
    }
  }

  
  public async inibirRobot(req: Request, res: Response, next: NextFunction) {
   
    const robotId = req.params.id; 
    const robotDTO: IRobotDTO = req.body; 
    console.log(robotId);
    if (!robotId) {
      return res.status(400).json({ error: 'ID robot erro' });
    }
    try {
      const robotListOrError = await this.robotServiceInstance.inibirRobot(robotId, robotDTO);

      if (robotListOrError.isFailure) {
        return res.status(400).json({ error: robotListOrError.error });
      }
      return res.json(robotListOrError.getValue()).status(200);
    } catch (e) {
      return res.json(e.message).status(400);
    }
  }


  public async reativarRobot(req: Request, res: Response, next: NextFunction) {
   
    const robotId = req.params.id; 
    const robotDTO: IRobotDTO = req.body; 
    console.log(robotId);
    if (!robotId) {
      return res.status(400).json({ error: 'ID robot erro' });
    }
    try {
      const robotListOrError = await this.robotServiceInstance.reativarRobot(robotId, robotDTO);

      if (robotListOrError.isFailure) {
        return res.status(400).json({ error: robotListOrError.error });
      }
      return res.json(robotListOrError.getValue()).status(200);
    } catch (e) {
      return res.json(e.message).status(400);
    }
  }



  public async delete(req: Request, res: Response, next: NextFunction) {
    await this.robotServiceInstance.delete(req.params.codigoRobot);
    ;
    return res.json('robot deleted').status(204);
  }
};
