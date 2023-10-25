import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import 'reflect-metadata';
import { Container } from 'typedi';
import config from '../../../config';
import IEdificioController from '../../controllers/IControllers/IEdificioController';

const route = Router();

export default (app: Router) => {
  app.use('/edificios', route);

  const ctrl = Container.get(config.controllers.edificio.name) as IEdificioController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        codigoEdificio: Joi.string()
          .regex(/^[a-zA-Z0-9\s]{1,5}$/)
          .required(),
        descricaoEdificio: Joi.string().required(),
        nomeEdificio: Joi.string().optional(),
        dimensaoMaximaPisos: Joi.object().required(),
      }),
    }),

    (req, res, next) => ctrl.createEdificio(req, res, next),
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        name: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.updateEdificio(req, res, next),
  );
};
