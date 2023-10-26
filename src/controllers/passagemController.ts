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

      const passagemOrError = await this.passagemServiceInstance.createPassagem(req.body as IPassagemDTO) as Result<IPassagemDTO>;
      if (passagemOrError.isFailure) {
        return res.status(400).json({error: passagemOrError.error});
      }

      const passagemDTO = passagemOrError.getValue();
      return res.json( passagemDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  }

  public async listarPassagens(req: Request, res: Response, next: NextFunction) {
    try {
      const passagemListOrError = await this.passagemServiceInstance.getPassagem();
      if (passagemListOrError.isFailure) {
        return res.status(400).send();
      }
      return res.json(passagemListOrError.getValue()).status(200);
    }
    catch (e) {
      return res.json(e.message).status(400);
    }
  }

  public async updatePassagem(req: Request, res: Response, next: NextFunction) {
    const passagemId = req.body.domainId;
    const passagemDTO: IPassagemDTO = req.body;

    if (!passagemId) {
      return res.status(400).json({ error: 'ID passagem erro' });
    }
    try {
      const passagemListOrError = await this.passagemServiceInstance.updatePassagem(passagemId, passagemDTO);

      if (passagemListOrError.isFailure) {
        return res.status(400).json({ error: passagemListOrError.error });
      }
      return res.json(passagemListOrError.getValue()).status(200);
    } catch (e) {
      return res.json(e.message).status(400);
    }
  }

};