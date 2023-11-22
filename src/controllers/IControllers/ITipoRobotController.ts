import { Request, Response, NextFunction } from 'express';

export default interface ITipoRobotController {
  createTipoRobot(req: Request, res: Response, next: NextFunction);
  getAllTipoRobots(req: Request, res: Response, next: NextFunction);  
}
