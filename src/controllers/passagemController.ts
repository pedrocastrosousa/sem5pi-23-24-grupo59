import { Inject, Service } from "typedi";
import IPassagemController from "./IControllers/IPassagemController";
import config from "../../config";
import { NextFunction, Request, Response } from "express";
import IPassagemService from "../services/IServices/IPassagemService";
import { IPassagemDTO } from "../dto/IPassagemDTO";
import { Result } from "../core/logic/Result";


@Service()
export default class PassagemController implements IPassagemController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
    @Inject(config.services.passagem.name) private passagemServiceInstance: IPassagemService
   ) {}

  public async createPassagem(req: Request, res: Response, next: NextFunction) {
    try {
              console.log('passagem controller 19');

      const passagemOrError = await this.passagemServiceInstance.createPassagem(req.body as IPassagemDTO) as Result<IPassagemDTO>;
      if (passagemOrError.isFailure) {
        return res.status(402).send();
      }

      const passagemDTO = passagemOrError.getValue();
      return res.json( passagemDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  }
};