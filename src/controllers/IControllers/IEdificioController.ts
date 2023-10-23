import { Request, Response, NextFunction } from 'express';

export default interface IEdificioController {
  createEdificio(req: Request, res: Response, next: NextFunction);
  findAll(req: Request, res: Response, next: NextFunction);
  updateEdificio(req: Request, res: Response, next: NextFunction);
}
