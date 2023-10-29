import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import IElevadorController from './IControllers/IElevadorController';
import { IElevadorDTO } from '../dto/IElevadorDTO';
import { Result } from "../core/logic/Result";
import IElevadorService from '../services/IServices/IElevadoreService';


@Service()
export default class ElevadorController implements IElevadorController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.elevador.name) private elevadorServiceInstance: IElevadorService
  ) { }

  public async createElevador(req: Request, res: Response, next: NextFunction) {
    try {
      const elevadorOrError = await this.elevadorServiceInstance.createElevador(req.body as IElevadorDTO) as Result<IElevadorDTO>;

      if (elevadorOrError.isFailure) {
        return res.status(400).json({ error: elevadorOrError.error});
      }

      const elevadorDTO = elevadorOrError.getValue();
      return res.json(elevadorDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  }

  public async listarElevadores(req: Request, res: Response, next: NextFunction) {
    try {
      const elevadorListOrError = await this.elevadorServiceInstance.getElevadores();
      if (elevadorListOrError.isFailure) {
        return res.status(400).send();
      }
      return res.json(elevadorListOrError.getValue()).status(200);
    }
    catch (e) {
      return res.json(e.message).status(400);
    }
  }



  // public async updateElevador(req: Request, res: Response, next: NextFunction) {
  //   const elevadorId = req.params.id;
  //   const elevadorDTO: IElevadorDTO = req.body;

  //   if (!elevadorId) {
  //     return res.status(400).json({ error: 'ID elevador erro' });
  //   }
  //   try {
  //     const elevadorListOrError = await this.elevadorServiceInstance.updateElevador(elevadorId, elevadorDTO);

  //     if (elevadorListOrError.isFailure) {
  //       return res.status(400).json({ error: elevadorListOrError.error });
  //     }
  //     return res.json(elevadorListOrError.getValue()).status(200);
  //   } catch (e) {
  //     return res.json(e.message).status(400);
  //   }
  // }
}
