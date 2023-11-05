import { Request, Response, NextFunction } from 'express';

export default interface IPassagemController  {
  createPassagem(req: Request, res: Response, next: NextFunction);
  listarPassagens(req: Request, res: Response, next: NextFunction);
  updatePassagem(req: Request, res: Response, next: NextFunction);
  listarAllPassagens(req: Request, res: Response, next: NextFunction);
  delete(req: Request, res: Response, next: NextFunction);

  //updatePassagem(req: Request, res: Response, next: NextFunction);
}