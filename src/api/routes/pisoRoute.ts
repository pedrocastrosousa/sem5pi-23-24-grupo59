import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';

import IPisoController from '../../controllers/IControllers/IPisoController';

import config from "../../../config";
import { isElement, isEmpty } from 'lodash';

const route = Router();

const Ajv = require("ajv");
const ajv = new Ajv();
const schema= config.schema;
const validate = ajv.compile(schema);

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
    async (req, res, next) => ctrl.createPiso(req, res, next));

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
    (req, res, next) => ctrl.updatePiso(req, res, next));

  route.get('/listarEdificioMinMaxPisos/', async (req, res, next) => {
    ctrl.listarEdificiosComMinMaxPisos(req, res, next);
  });


  route.get('/listarPisosComPassagemEdificio/', async (req, res, next) => {
    ctrl.listarPisosDeEdificioComPassagem(req, res, next);
  });

  route.get('/listarPisosEdificio/:codigoEdificio', async (req, res, next) => {
    ctrl.listarPisosPorEdificio(req, res, next);
  });


  route.patch('/carregarMapa',
    
    (req, res, next) => {
      const ficheiro = req.body;
      if(isEmpty(ficheiro)){
        return res.status(200).json("O ficheiro carregado não é um ficheiro JSON ");
      }
     const valido = validate(req.body);
      if(valido){
        ctrl.carregarMapa(req, res, next);
      } else{
       res.status(200).json("Incorrect file schema")

      }
    }
  )

  route.get('/listarEdificioMinMaxPisos/', async (req, res, next) => {
    ctrl.listarEdificiosComMinMaxPisos(req, res, next);
  });

  route.get('/listarAllPisos/', async (req, res, next) => {
    ctrl.listarPisos(req, res, next);
  });

  route.get('/map', async (req, res, next) => 
    ctrl.getSalasDeTodosOsMapas(req, res, next),
  );

  
route.get('/map/:codigoPiso',(req, res, next) => ctrl.getSalasDeMapaDePiso(req, res, next),
  );
route.get('/map', ctrl.getSalasDeTodosOsMapas);


  route.delete(
    '/:codigoPiso',
    celebrate({
      params: Joi.object({
        codigoPiso: Joi.string().required(),
      }),
    }),
    (req, res, next) => ctrl.delete(req, res, next),
  );
};