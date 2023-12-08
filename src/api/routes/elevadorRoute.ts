import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import IEdificioController from '../../controllers/IControllers/IEdificioController';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import config from "../../../config";
import IElevadorController from '../../controllers/IControllers/IElevadorController';



const route = Router();

export default (app: Router) => {
    app.use('/elevadores', route);

    const ctrl = Container.get(config.controllers.elevador.name) as IElevadorController;

    route.post('/criarElevador',
        celebrate({
            body: Joi.object({
                edificio: Joi.string().required(),
                pisos: Joi.array().items(Joi.string()).required(),
                numeroSerie: Joi.string().optional(),
                modelo: Joi.string().optional(),
                marca: Joi.string().optional(),
                descricao: Joi.string().optional(),
            })
        }),
        async (req, res, next) => ctrl.createElevador(req, res, next));


    route.get('/listar', async (req, res, next) => {
        ctrl.listarElevadores(req, res, next);
    });


    route.put('/editarElevador/:numeroIdentificativo',
        celebrate({
            body: Joi.object({
                pisos: Joi.array().items(Joi.string()).optional(),
                numeroSerie: Joi.string().optional(),
                modelo: Joi.string().optional(),
                marca: Joi.string().optional(),
                descricao: Joi.string().optional(),
            }),
            params: Joi.object({
                numeroIdentificativo: Joi.string().required()
            })
        }),
        async (req, res, next) => ctrl.updateElevador(req, res, next));

        route.delete('/eliminarElevador/:numeroIdentificativo',
            celebrate({
              params: Joi.object({
                numeroIdentificativo: Joi.string().required(),
              }),
            }),
            (req, res, next) => ctrl.deleteElevador(req, res, next),
          );



          route.get('/listarPisosDeElevadorPorEdificio/:edificio',
            celebrate({
                params: Joi.object({
                edificio: Joi.string().required(),
                }),
            }),(req, res, next) => ctrl.listarPisosDeElevadorPorEdificio(req, res, next),
            );
}
