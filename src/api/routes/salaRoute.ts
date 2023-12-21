import { Router, Request, Response, NextFunction } from 'express';
import { Container } from 'typedi';
import { ISalaDTO } from '../../dto/ISalaDTO';
import ISalaController from '../../controllers/IControllers/ISalaController';
import middlewares from '../middlewares';
import { celebrate, Joi } from 'celebrate';
import winston = require('winston');
import config from "../../../config";



const route = Router();

export default (app: Router) => {
    app.use('/salas', route);

    const ctrl = Container.get(config.controllers.sala.name) as ISalaController;

    route.post('/criarSala',
        celebrate({
            body: Joi.object({
                // IDSala: Joi.string().required(),
                nomeSala: Joi.string().required(),
                categoriaSala: Joi.string().required(),
                dimensaoSala: Joi.object({
                    x1: Joi.number().integer().required(),
                    y1: Joi.number().integer().required(),
                    x2: Joi.number().integer().required(),
                    y2: Joi.number().integer().required()
                }),
                descricaoSala: Joi.string().required(),
                piso: Joi.string().required()
            })
        }),
        async (req, res, next) => ctrl.createSala(req, res, next));

        route.get('/listarSalas', async (req, res, next) => {
            ctrl.listarSalas(req, res, next);
          });
}