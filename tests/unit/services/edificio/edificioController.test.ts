import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../src/core/logic/Result';
import IEdificioService from '../../../../src/services/IServices/IEdificioService';
import EdificioController from '../../../../src/controllers/edificioController';
import IEdificioDTO from '../../../../src/dto/IEdificioDTO';

describe('unit tests - edificio controller', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    this.timeout(6000);
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

  it('createEdificio - edificioController unit test using edificioService stub', async function() {
    // Arrange
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
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    let next: Partial<NextFunction> = () => {};

    let edificioServiceInstance = Container.get('EdificioService');
    sinon
      .stub(edificioServiceInstance, 'createEdificio')
      .returns(Promise.resolve(Result.ok<IEdificioDTO>(body as IEdificioDTO)));

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        codigoEdificio: req.body.codigoEdificio,
        descricaoEdificio: req.body.descricaoEdificio,
        nomeEdificio: req.body.nomeEdificio,
        dimensaoMaximaPisos: req.body.dimensaoMaximaPisos,
      }),
    );
  });

  it('updateEdificio - edificioController unit test using edificioService stub', async function() {
    // Arrange
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
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    let next: Partial<NextFunction> = () => {};

    let edificioServiceInstance = Container.get('EdificioService');

    sinon
      .stub(edificioServiceInstance, 'updateEdificio')
      .returns(Promise.resolve(Result.ok<IEdificioDTO>(body as IEdificioDTO)));

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.updateEdificio(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledWith(res.json, body);
  });

  it('findAll - edificioController unit test using edificioService stub', async function() {
    // Arrange
    let body = [
      {
        codigoEdificio: '99979',
        descricaoEdificio: 'Seguranca',
        nomeEdificio: 'Informatica',
        dimensaoMaximaPisos: {
          largura: 1,
          comprimento: 2,
        },
      },
      {
        codigoEdificio: '88852',
        descricaoEdificio: 'Informacao',
        nomeEdificio: 'Gestao',
        dimensaoMaximaPisos: {
          largura: 2,
          comprimento: 4,
        },
      },
    ];

    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    let next: Partial<NextFunction> = () => {};

    let edificioServiceInstance = Container.get('EdificioService');

    sinon
      .stub(edificioServiceInstance, 'findAll')
      .returns(Promise.resolve(Result.ok<IEdificioDTO[]>(body as IEdificioDTO[])));

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.findAll(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, body);
  });
});
