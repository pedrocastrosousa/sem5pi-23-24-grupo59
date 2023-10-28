import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import IPisoController from '../../controllers/IControllers/IPisoController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/pisos', route);
console.log('piso route');

  const ctrl = Container.get(config.controllers.piso.name) as IPisoController;
  route.post('/criarPiso',
    celebrate({
      body: Joi.object({
        nome: Joi.string().required(),
        descricao: Joi.string().required(),
        edificio: Joi.string().required()
      })
    }),
    async (req, res, next) => ctrl.createPiso(req, res, next) );

  route.put('/:codigoPiso',
    celebrate({
      body: Joi.object({
        nome: Joi.string().required(), 
        descricao: Joi.string().required(),
      }),
      params: Joi.object({
        codigoPiso: Joi.string().required()
    })
    }),
    (req, res, next) => ctrl.updatePiso(req, res, next) );
    
    route.get('/listarEdificioMinMaxPisos/', async (req, res, next) => {
      ctrl.listarEdificiosComMinMaxPisos(req, res, next);
  });


  route.get('/listarPisosComPassagemEdificio/', async (req, res, next) => {
    ctrl.listarPisosDeEdificioComPassagem(req, res, next);
  });

  route.get('/listarPisosEdificio/:codigoEdificio', async (req, res, next) => {
    ctrl.listarPisosPorEdificio(req, res, next);
});
};