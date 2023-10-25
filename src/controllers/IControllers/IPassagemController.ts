import { Request, Response, NextFunction } from 'express';

export default interface IPassagemController  {
  createPassagem(req: Request, res: Response, next: NextFunction);
  //updatePassagem(req: Request, res: Response, next: NextFunction);
}