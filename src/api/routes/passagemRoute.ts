import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import config from "../../../config";
import IPassagemController from '../../controllers/IControllers/IPassagemController';

const route = Router();

export default (app: Router) => {
  app.use('/passagem', route);
console.log('passagem route');

  const ctrl = Container.get(config.controllers.passagem.name) as IPassagemController;
  route.post('/criarPassagem',
    celebrate({
      body: Joi.object({
        coordenadaPiso1: Joi.object({
          x: Joi.number().integer().required(),
          y: Joi.number().integer().required(),
          piso: Joi.string().required(),
        }),
        coordenadaPiso2: Joi.object({
          x: Joi.number().integer().required(),
          y: Joi.number().integer().required(),
          piso: Joi.string().required(),
        }),
      })
    }),
    async (req, res, next) => ctrl.createPassagem(req, res, next) );
}
