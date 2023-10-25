import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import 'reflect-metadata';
import { Container } from 'typedi';
import config from '../../../config';
import ITipoRobotController from '../../controllers/IControllers/ITipoRobotController';

const route = Router();

export default (app: Router) => {
  app.use('/tipoRobots', route);

  const ctrl = Container.get(config.controllers.tipoRobot.name) as ITipoRobotController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        idTipoRobot: Joi.number().required(),
        designacaoTipoRobot: Joi.string().required(),
      }),
    }),

    (req, res, next) => ctrl.createTipoRobot(req, res, next),
  );
};