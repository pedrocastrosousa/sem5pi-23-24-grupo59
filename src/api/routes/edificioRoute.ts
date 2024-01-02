import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import 'reflect-metadata';
import { Container } from 'typedi';
import config from '../../../config';
import IEdificioController from '../../controllers/IControllers/IEdificioController';
import isAuth from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use('/edificios', isAuth, route);

  const ctrl = Container.get(config.controllers.edificio.name) as IEdificioController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        codigoEdificio: Joi.string().required(),
        descricaoEdificio: Joi.string().required(),
        nomeEdificio: Joi.string()
          .optional()
          .allow(''),
        dimensaoMaximaPisos: Joi.object().required(),
      }),
    }),
    (req, res, next) => ctrl.createEdificio(req, res, next),
  );

  route.put(
    '',
    celebrate({
      body: Joi.object({
        codigoEdificio: Joi.string().required(),
        descricaoEdificio: Joi.string().required(),
        nomeEdificio: Joi.string()
          .optional()
          .allow(''),
        dimensaoMaximaPisos: Joi.object().required(),
      }),
    }),
    (req, res, next) => ctrl.updateEdificio(req, res, next),
  );

  route.get('', (req, res, next) => ctrl.findAll(req, res, next));

  route.delete(
    '/:codigoEdificio',
    celebrate({
      params: Joi.object({
        codigoEdificio: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.delete(req, res, next),
  );
};
