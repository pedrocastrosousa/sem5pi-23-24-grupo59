import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import IPassagemService from '../services/IServices/IPassagemService';
import { IPassagemDTO } from '../dto/IPassagemDTO';

import { Result } from "../core/logic/Result";
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IPassagemController from './IControllers/IPassagemController';


@Service()
export default class PassagemController implements IPassagemController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.passagem.name) private passagemServiceInstance : IPassagemService
  ) {}

  public async createPassagem(req: Request, res: Response, next: NextFunction) {
    try {
      const passagemOrError = await this.passagemServiceInstance.createPassagem(req.body as IPassagemDTO) as Result<IPassagemDTO>;
        
      if (passagemOrError.isFailure) {
        return res.status(402).send();
      }

      const PassagemDTO = passagemOrError.getValue();
      return res.json( PassagemDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
};