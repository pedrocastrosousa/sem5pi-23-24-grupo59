import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';
import 'reflect-metadata';
import { Container } from 'typedi';
import config from '../../../config';
import ITipoRobotController from '../../controllers/IControllers/ITipoRobotController';
import isAuth from '../middlewares/isAuth';
const route = Router();

export default (app: Router) => {
  app.use('/tipoRobots', isAuth, route);

  const ctrl = Container.get(config.controllers.tipoRobot.name) as ITipoRobotController;

  route.post(
    '',
    celebrate({
      body: Joi.object({
        designacaoTipoRobot: Joi.string().required(),
        tipoTarefaTipoRobot: Joi.array()
          .items(Joi.string())
          .required(),
      }),
    }),

    (req, res, next) => ctrl.createTipoRobot(req, res, next),
  );

  route.get('', (req, res, next) => ctrl.getAllTipoRobots(req, res, next));
};