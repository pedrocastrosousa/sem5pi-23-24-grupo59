import { Request, Response, NextFunction } from 'express';

export default interface IElevadorController  {
  createElevador(req: Request, res: Response, next: NextFunction);
  listarElevadores(req: Request, res: Response, next: NextFunction);
  //updateElevador(req: Request, res: Response, next: NextFunction);
}