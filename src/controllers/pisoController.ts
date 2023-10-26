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

   public async listarEdificiosComMinMaxPisos(req: Request, res: Response, next: NextFunction) {

    const minPiso = req.query.min as string;
    const maxPiso = req.query.max as string;

    // Check if the query parameters exist
    if (!minPiso || !maxPiso) {
      res.status(400).json({ error: 'Parâmetros min e max são obrigatórios.' });
      return;
    }

    try {
      const pisoListOrError = await this.pisoServiceInstance.getEdificiosComMinMaxPisos(minPiso, maxPiso);

      if (pisoListOrError.isFailure) {
        return res.status(400).send();
      }
      return res.json(pisoListOrError.getValue()).status(200);
    }
    catch (e) {
      return res.json(e.message).status(400);
    }
  }
   
};