import { Request, Response, NextFunction } from 'express';

export default interface IPisoController  {
  createPiso(req: Request, res: Response, next: NextFunction);
  updatePiso(req: Request, res: Response, next: NextFunction);
  listarEdificiosComMinMaxPisos(req: Request, res: Response, next: NextFunction);
  listarPisosDeEdificioComPassagem(req: Request, res: Response, next: NextFunction);
  listarPisosPorEdificio(req: Request, res: Response, next: NextFunction);
  carregarMapa(req: Request, res: Response, next: NextFunction);
  listarPisos(req: Request, res: Response, next: NextFunction);
  delete(req: Request, res: Response, next: NextFunction);

}