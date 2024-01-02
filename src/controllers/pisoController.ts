import { Response, Request, NextFunction } from 'express';

import config from '../../config';
import IPisoController from './IControllers/IPisoController';
import IPisoService from '../services/IServices/IPisoService';
import { Result } from '../core/logic/Result';
import { Inject, Service } from 'typedi';
import { IPisoDTO } from '../dto/IPisoDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import IMapaDTO from '../dto/IMapaDTO';


@Service()
export default class PisoController implements IPisoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(@Inject(config.services.piso.name) private pisoServiceInstance: IPisoService) {}

  public async createPiso(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoOrError = (await this.pisoServiceInstance.createPiso(req.body as IPisoDTO)) as Result<IPisoDTO>;

      if (pisoOrError.isFailure) {
        return res.status(402).send();
      }

      const pisoDTO = pisoOrError.getValue();
      return res.json(pisoDTO).status(201);
    } catch (e) {
      return next(e);
    }
  }

  public async updatePiso(req: Request, res: Response, next: NextFunction) {
    const pisoId = req.params.codigoPiso;
    const pisoDTO: IPisoDTO = req.body;

    if (!pisoId) {
      return res.status(400).json({ error: 'ID piso erro' });
    }
    try {
      const pisoListOrError = await this.pisoServiceInstance.updatePiso(pisoId, pisoDTO);

      if (pisoListOrError.isFailure) {
        return res.status(400).json({ error: pisoListOrError.error });
      }
      return res.json(pisoListOrError.getValue()).status(200);
    } catch (e) {
      return res.json(e.message).status(400);
    }
  }

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
    } catch (e) {
      return res.json(e.message).status(400);
    }
  }

  public async listarPisosDeEdificioComPassagem(req: Request, res: Response, next: NextFunction) {
    const edificio = req.query.edificio as string;
    // Check if the query parameters exist
    if (!edificio) {
      res.status(400).json({ error: 'Parâmetro edificio obrigatório.' });
      return;
    }

    try {
      const pisoListOrError = await this.pisoServiceInstance.getPisosDeEdificioComPassagem(edificio);

      if (pisoListOrError.isFailure) {
        return res.status(400).send();
      }
      return res.json(pisoListOrError.getValue()).status(200);
    } catch (e) {
      return res.json(e.message).status(400);
    }
  }

  public async listarPisosPorEdificio(req: Request, res: Response, next: NextFunction) {
    const edCodigo = req.params.codigoEdificio;
    try {
      const pisoListOrError = await this.pisoServiceInstance.getPisosPorEdificio(edCodigo);

      if (pisoListOrError.isFailure) {
        return res.status(400).send();
      }
      return res.json(pisoListOrError.getValue()).status(200);
    } catch (e) {
      return res.json(e.message).status(400);
    }
  }

  public async carregarMapa(req: Request, res: Response, next: NextFunction) {
    try {
      const ficheiroDTO = req.body as IMapaDTO;
      const carregarMapaOrError = await this.pisoServiceInstance.carregarMapa(ficheiroDTO);

      if (carregarMapaOrError.isFailure) {
        return res.status(400).json({ error: carregarMapaOrError.error });
      }
      return res.json(carregarMapaOrError.getValue()).status(200);
    } catch (e) {
      return res.json(e.message).status(400);
    }
  }

  public async listarPisos(req: Request, res: Response, next: NextFunction) {
    try {
      const pisoListOrError = await this.pisoServiceInstance.listarPisos();

      if (pisoListOrError.isFailure) {
        return res.status(400).send();
      }
      return res.json(pisoListOrError.getValue()).status(200);
    } catch (e) {
      return res.json(e.message).status(400);
    }
  }

  public async getSalasDeMapaDePiso(req: Request, res: Response){
    const codigoPiso: string = req.params.codigoPiso;
    try {
      const result = await this.pisoServiceInstance.getSalasDeMapaDePiso(codigoPiso);
      if (result.isFailure) {
        res.status(404).json({ error: result.error });
      } else {
        res.status(200).json(result.getValue());
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  public async getSalasDeTodosOsMapas(req: Request, res: Response){
    try {
      const result = await this.pisoServiceInstance.getSalasDeTodosOsMapas();
      if (result.isFailure) {
        res.status(404).json({ error: result.error });
      } else {
        res.status(200).json(result.getValue());
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  //---planeamento---
  public async obterBaseDeConhecimento(req: Request, res: Response, next: NextFunction) {
    try {
      const baseDeConhecimentoOrError = await this.pisoServiceInstance.obterBaseDeConhecimento() as Result<string>;

      if (baseDeConhecimentoOrError.isFailure) {
        return res.status(404).send();
      }

      const baseDeConhecimentoDTO = baseDeConhecimentoOrError.getValue();
      return res.status(200).json(baseDeConhecimentoDTO);
    }
    catch (e) {
      return next(e);
    }
  }

  public async melhorCaminho(req: Request, res: Response, next: NextFunction) {
    try {
      const origem = req.query.origem as string;
      const destino = req.query.destino as string;
      console.log(origem);
      console.log(destino);
      const melhorCaminhoOrError = await this.pisoServiceInstance.melhorCaminho(origem,destino) as Result<string>;

      if (melhorCaminhoOrError.isFailure) {
        return res.status(404).send({error: melhorCaminhoOrError.error});
      }

      const melhorCaminho = melhorCaminhoOrError.getValue();
      return res.status(200).json(melhorCaminho);
    }
    catch (e) {
      return next(e);
    }
  }

  public async delete(req: Request, res: Response, next: NextFunction) {
    await this.pisoServiceInstance.delete(req.params.codigoPiso);
    return res.json('piso deleted').status(204);
  }
};
