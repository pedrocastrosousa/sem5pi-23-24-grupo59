import { Request, Response, NextFunction } from 'express';

export default interface IRobotController  {
  createRobot(req: Request, res: Response, next: NextFunction);
  listarRobots(req: Request, res: Response, next: NextFunction);
  inibirRobot(req: Request, res: Response, next: NextFunction);
  reativarRobot(req: Request, res: Response, next: NextFunction);
  delete(req: Request, res: Response, next: NextFunction);
}