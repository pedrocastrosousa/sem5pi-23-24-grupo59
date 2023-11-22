import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import config from "../../../config";
import IRobotController from '../../controllers/IControllers/IRobotController';



const route = Router();

export default (app: Router) => {
    app.use('/robots', route);

    const ctrl = Container.get(config.controllers.robot.name) as IRobotController;

    route.post('/criarRobot',
        celebrate({
            body: Joi.object({
                codigoRobot: Joi.string().required(),
                nicknameRobot: Joi.string().required(),
                tipoRobot: Joi.string().required(),
                numeroSerieRobot: Joi.string().required(),
                descricaoRobot: Joi.string().optional(),
            })
        }),
        async (req, res, next) => ctrl.createRobot(req, res, next));


    route.get('/listar', async (req, res, next) => {
        ctrl.listarRobots(req, res, next);
    });

    

    route.patch('/:id',
        celebrate({
            body: Joi.object({
                
            }),
            params: Joi.object({ 
                id: Joi.string().required()
            })
        }),
        async (req, res, next) => ctrl.inibirRobot(req, res, next));

        route.patch('/reativar/:id',
        celebrate({
            body: Joi.object({
                
            }),
            params: Joi.object({ 
                id: Joi.string().required()
            })
        }),
        async (req, res, next) => ctrl.reativarRobot(req, res, next));

        route.delete(
            '/:codigoRobot',
            celebrate({
              params: Joi.object({
                codigoRobot: Joi.string().required(),
              }),
            }),
            (req, res, next) => ctrl.delete(req, res, next),
          );
}
