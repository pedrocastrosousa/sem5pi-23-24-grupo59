import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../src/core/logic/Result';
import IEdificioService from '../../../../src/services/IServices/IEdificioService';
import EdificioController from '../../../../src/controllers/edificioController';
import IEdificioDTO from '../../../../src/dto/IEdificioDTO';

describe('edificio controller', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    Container.reset();
    let edificioSchemaInstance = require('../../../../src/persistence/schemas/edificioSchema').default;
    Container.set('edificioSchema', edificioSchemaInstance);

    let edificioRepoClass = require('../../../../src/repos/edificioRepo').default;
    let edificioRepoInstance = Container.get(edificioRepoClass);
    Container.set('EdificioRepo', edificioRepoInstance);

    let edificioServiceClass = require('../../../../src/services/edificioService').default;
    let edificioServiceInstance = Container.get(edificioServiceClass);
    Container.set('EdificioService', edificioServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  // teste ao create
  it('edificioController unit test using edificioService stub', async function() {
    let body = {
      codigoEdificio: '99979',
      descricaoEdificio: 'Seguranca',
      nomeEdificio: 'Informatica',
      dimensaoMaximaPisos: {
        largura: 1,
        comprimento: 2,
      },
    };
    let req: Partial<Request> = {};
    req.body = body;
    let res: Partial<Response> = {
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let edificioServiceInstance = Container.get('EdificioService');
    sinon.stub(edificioServiceInstance, 'createEdificio').returns(
      Result.ok<IEdificioDTO>({
        id: '',
        codigoEdificio: req.body.codigoEdificio,
        descricaoEdificio: req.body.descricaoEdificio,
        nomeEdificio: req.body.nomeEdificio,
        dimensaoMaximaPisos: {
        comprimento: req.body.dimensaoMaximaPisos.largura,
        largura: req.body.dimensaoMaximaPisos.comprimento
        }
      }),
    ); 

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        id: '',
        codigoEdificio: req.body.codigoEdificio,
        descricaoEdificio: req.body.descricaoEdificio,
        nomeEdificio: req.body.nomeEdificio,
        dimensaoMaximaPisos: {
          comprimento: req.body.dimensaoMaximaPisos.largura,
          largura: req.body.dimensaoMaximaPisos.comprimento,
        },
      }),
    ); 
  });
});
