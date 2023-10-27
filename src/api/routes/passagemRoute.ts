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
          piso1: Joi.string().required(),
          piso2: Joi.string().required(),
        }),
    }),
    async (req, res, next) => ctrl.createPassagem(req, res, next) );

    route.get('/listarPassagensEdificio1Edificio2/', async (req, res, next) => {
    ctrl.listarPassagens(req, res, next);
  });

  route.put('/:id',
        celebrate({
            body: Joi.object({
                piso1: Joi.string(),
                piso2: Joi.string(),
            }),
            params: Joi.object({
              codigoPassagem: Joi.string().required()
          })
        }),
        async (req, res, next) => ctrl.updatePassagem(req, res, next));



}

