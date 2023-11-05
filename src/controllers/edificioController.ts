import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from '../../config';

import IEdificioController from './IControllers/IEdificioController';
import IEdificioService from '../services/IServices/IEdificioService';
import IEdificioDTO from '../dto/IEdificioDTO';

import { Result } from '../core/logic/Result';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class EdificioController
  implements IEdificioController /* TODO: extends ../core/infra/BaseController */ {
  constructor(@Inject(config.services.edificio.name) private edificioServiceInstance: IEdificioService) {}
  public async findAll(req: Request, res: Response, next: NextFunction) {
    try {
      const edificioOrError = await this.edificioServiceInstance.findAll();

      if (edificioOrError.isFailure) {
        return res.status(402).send();
      }

      const edificioDTO = edificioOrError.getValue();

      return res.status(200).json(edificioDTO);
    } catch (e) {
      return next(e);
    }
  }
  public async createEdificio(req: Request, res: Response, next: NextFunction) {
    try {
      const edificioOrError = (await this.edificioServiceInstance.createEdificio(req.body as IEdificioDTO)) as Result<
        IEdificioDTO
      >;

      if (edificioOrError.isFailure) {
        const errorMessage = edificioOrError.errorValue();
        return res.status(404).send(errorMessage);
      }

      const edificioDTO = edificioOrError.getValue();
      return res.status(201).json(edificioDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async updateEdificio(req: Request, res: Response, next: NextFunction) {
    try {
      const edificioOrError = (await this.edificioServiceInstance.updateEdificio(req.body as IEdificioDTO)) as Result<
        IEdificioDTO
      >;

      if (edificioOrError.isFailure) {
        return res.status(404).send();
      }

      const edificioDTO = edificioOrError.getValue();
      return res.status(201).json(edificioDTO);
    } catch (e) {
      return next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    await this.edificioServiceInstance.delete(req.params.codigoEdificio);
    ;
    return res.status(204).send('edificio deleted');
  }

  
}
