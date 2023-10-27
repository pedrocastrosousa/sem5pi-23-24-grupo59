import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import ISalaController from './IControllers/ISalaController';
import ISalaService from '../services/IServices/ISalaService';
import { ISalaDTO } from '../dto/ISalaDTO';

import { Result } from "../core/logic/Result";


@Service()
export default class SalaController implements ISalaController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.sala.name) private salaServiceInstance : ISalaService
  ) {}

  public async createSala(req: Request, res: Response, next: NextFunction) {
    try {
      console.log('log1\n', req.body);
      const salaOrError = await this.salaServiceInstance.createSala(req.body as ISalaDTO) as Result<ISalaDTO>;
      
      if (salaOrError.isFailure) {
        return res.status(400).json({error: salaOrError.error});
      }

      const salaDTO = salaOrError.getValue();
      console.log('log2\n', salaDTO);
      return res.json( salaDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
};
