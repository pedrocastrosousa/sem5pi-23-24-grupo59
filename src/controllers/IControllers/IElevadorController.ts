import { Request, Response, NextFunction } from 'express';

export default interface IElevadorController  {
  createElevador(req: Request, res: Response, next: NextFunction);
  listarElevadores(req: Request, res: Response, next: NextFunction);
  updateElevador(req: Request, res: Response, next: NextFunction);
  deleteElevador(req: Request, res: Response, next: NextFunction);
  listarPisosDeElevadorPorEdificio(req: Request, res: Response, next: NextFunction);
}
