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
                codigo: Joi.string().required(),
                nickname: Joi.string().required(),
                tipo: Joi.string().required(),
                numeroSerie: Joi.string().required(),
                descricao: Joi.string().optional(),
            })
        }),
        async (req, res, next) => ctrl.createRobot(req, res, next));


    route.get('/listar', async (req, res, next) => {
        ctrl.listarRobots(req, res, next);
    });

    /*

    route.patch('/:id',
        celebrate({
            body: Joi.object({
                
            }),
            params: Joi.object({ 
                id: Joi.string().required()
            })
        }),
        async (req, res, next) => ctrl.updateRobot(req, res, next));
}
*/
}
