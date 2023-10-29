import * as sinon from 'sinon';

import { Response, Request, NextFunction } from 'express';

import { Container } from 'typedi';
import config from "../../config";

import { Result } from '../core/logic/Result';

import IPisoService from "../services/IServices/IPisoService";
import { IPisoDTO } from '../dto/IPisoDTO';
import PisoController from './pisoController';


describe('piso controller', function () {
	beforeEach(function() {
    });

    it('createPiso: returns json with id+name values', async function () {
        let body = { "name":'piso12' };
        let req: Partial<Request> = {};
		req.body = body;

        let res: Partial<Response> = {
			json: sinon.spy()
        };
		let next: Partial<NextFunction> = () => {};

		let pisoServiceClass = require(config.services.piso.path).default;
		let pisoServiceInstance = Container.get(pisoServiceClass)
		Container.set(config.services.piso.name, pisoServiceInstance);

		pisoServiceInstance = Container.get(config.services.piso.name);
		sinon.stub(pisoServiceInstance, "createPiso").returns( Result.ok<IPisoDTO>( {"id":"123", "nome": req.body.nome,"descricao": req.body.descricao, "edificio": req.body.edificio, "codigoPiso":req.body.codigoPiso} ));

		const ctrl = new PisoController(pisoServiceInstance as IPisoService);

		await ctrl.createPiso(<Request>req, <Response>res, <NextFunction>next);

		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({ "id": "123","name": req.body.name}));
	});
});