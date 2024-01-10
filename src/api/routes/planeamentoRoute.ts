import { Router } from 'express';
import { Container } from 'typedi';
import IPisoController from '../../controllers/IControllers/IPisoController';
import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/planeamento', route);
 
    const ctrl = Container.get(config.controllers.piso.name) as IPisoController;
   
    route.get('/obterBC', async (req, res, next) => {
        ctrl.obterBaseDeConhecimento(req, res, next);
    });
 
    route.get('/melhorCaminho', async (req, res, next) => {
        ctrl.melhorCaminho(req, res, next);
 
    });

    route.post('/SequenciaTarefas', async (req, res, next) => {
        console.log( 'tarefas ' + req.body);
        ctrl.getSequenciaTarefas(req, res, next);
    });
}