import { Response, Request, NextFunction } from 'express';

import config from '../../config';
import IPisoController from './IControllers/IPisoController';
import IPisoService from '../services/IServices/IPisoService';
import { Result } from '../core/logic/Result';
import { Inject, Service } from 'typedi';
import { IPisoDTO } from '../dto/IPisoDTO';


@Service()
export default class PisoController implements IPisoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.piso.name) private pisoServiceInstance: IPisoService
  ) { }

  public async createPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = await this.pisoServiceInstance.createPiso(req.body as IPisoDTO) as Result<IPisoDTO>;

      if (pisoOrError.isFailure) {
        return res.status(402).send();
      }

      const pisoDTO = pisoOrError.getValue();
      return res.json(pisoDTO).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

   public async updatePiso(req: Request, res: Response, next: NextFunction) {
     try {
       const pisoOrError = await this.pisoServiceInstance.updatePiso(req.body as IPisoDTO) as Result<IPisoDTO>;
       if (pisoOrError.isFailure) {
         return res.status(404).send();
       }
 
       const pisoDTO = pisoOrError.getValue();
       return res.status(201).json( pisoDTO );
     }
     catch (e) {
       return next(e);
     }
   };
   
};