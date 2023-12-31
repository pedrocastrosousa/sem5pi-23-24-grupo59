import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import IEdificioService from '../../../src/services/IServices/IEdificioService';
import EdificioController from '../../../src/controllers/edificioController';
import IEdificioDTO from '../../../src/dto/IEdificioDTO';
import { EdificioMap } from '../../../src/mappers/EdificioMap';
import { Edificio } from '../../../src/domain/edificio/edificio';

describe('integracao - edificio controller', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    this.timeout(6000);
    Container.reset();
    let edificioSchemaInstance = require('../../../src/persistence/schemas/edificioSchema').default;
    Container.set('edificioSchema', edificioSchemaInstance);

    let edificioRepoClass = require('../../../src/repos/edificioRepo').default;
    let edificioRepoInstance = Container.get(edificioRepoClass);
    Container.set('EdificioRepo', edificioRepoInstance);

    let edificioServiceClass = require('../../../src/services/edificioService').default;
    let edificioServiceInstance = Container.get(edificioServiceClass);
    Container.set('EdificioService', edificioServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('createEdificio - edificioController + edificioService integration test', async function() {
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
      status: sinon.spy(),
      json: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {};

    let edificioRepoInstance = Container.get('EdificioRepo');
    sinon.stub(edificioRepoInstance, 'findByCodigo').returns(null);
    sinon.stub(edificioRepoInstance, 'save').returns(Promise.resolve(Result.ok<IEdificioDTO>(body as IEdificioDTO)));

    let edificioServiceInstance = Container.get('EdificioService');
    const edificioServiceSpy = sinon.spy(edificioServiceInstance, 'createEdificio');

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledOnce(edificioServiceSpy);
    sinon.assert.calledWith(edificioServiceSpy, body);
  });

  it('createEdificio - returns 404 (edificio already exists)', async function() {
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
      status: sinon.spy(),
      json: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {};

    let edificioRepoInstance = Container.get('EdificioRepo');
    sinon
      .stub(edificioRepoInstance, 'findByCodigo')
      .returns(Result.fail<Edificio>('Ja existe um edificio com o codigo inserido!'));

    let edificioServiceInstance = Container.get('EdificioService');
    const edificioServiceSpy = sinon.spy(edificioServiceInstance, 'createEdificio');

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledOnce(edificioServiceSpy);
    sinon.assert.calledWith(edificioServiceSpy, body);
  });

  it('updateEdificio - edificioController + edificioService integration test', async function() {
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
      status: sinon.spy(),
      json: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {};

    let edificioRepoInstance = Container.get('EdificioRepo');
    sinon
      .stub(edificioRepoInstance, 'findByCodigo')
      .returns(Promise.resolve(EdificioMap.toDomain(body as IEdificioDTO)));
    sinon.stub(edificioRepoInstance, 'save').returns(Promise.resolve(EdificioMap.toDomain(body as IEdificioDTO)));

    let edificioServiceInstance = Container.get('EdificioService');
    const edificioServiceSpy = sinon.spy(edificioServiceInstance, 'updateEdificio');

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.updateEdificio(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledOnce(edificioServiceSpy);
    sinon.assert.calledWith(edificioServiceSpy, body);
  });

  it('updateEdificio - returns 404 (edificio not found)', async function() {
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
      status: sinon.spy(),
      json: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {};

    let edificioRepoInstance = Container.get('EdificioRepo');
    sinon.stub(edificioRepoInstance, 'findByCodigo').returns(null);

    let edificioServiceInstance = Container.get('EdificioService');
    const edificioServiceSpy = sinon.spy(edificioServiceInstance, 'updateEdificio');

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.updateEdificio(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledOnce(edificioServiceSpy);
    sinon.assert.calledWith(edificioServiceSpy, body);
  });

  it('findAll - edificioController + edificioService integration test', async function() {
    // Arrange
    let body = [
      {
        codigoEdificio: '95973',
        descricaoEdificio: 'Seguranca',
        nomeEdificio: 'Informatica',
        dimensaoMaximaPisos: {
          largura: 1,
          comprimento: 2,
        },
      },
      {
        codigoEdificio: '81652',
        descricaoEdificio: 'Informacao',
        nomeEdificio: 'Gestao',
        dimensaoMaximaPisos: {
          largura: 2,
          comprimento: 4,
        },
      },
    ];

    let req: Partial<Request> = {};
    req.params = {};

    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {};

    let edificioRepoInstance = Container.get('EdificioRepo');

    let edificios: Edificio[] = [];
    body.forEach(async edificio => {
      edificios.push(await EdificioMap.toDomain(edificio));
    });

    sinon.stub(edificioRepoInstance, 'findAll').returns(edificios);

    let edificioServiceInstance = Container.get('EdificioService');
    const edificioServiceSpy = sinon.spy(edificioServiceInstance, 'findAll');

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    let answer = await ctrl.findAll(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledOnce(edificioServiceSpy);
    sinon.assert.calledWith(edificioServiceSpy);
  });

  it('findaAll - returns 402 (empty list)', async function() {
    // Arrange
    let body = [];

    let req: Partial<Request> = {};
    req.params = {};

    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {};

    let edificioRepoInstance = Container.get('EdificioRepo');

    sinon.stub(edificioRepoInstance, 'findAll').returns(null);

    let edificioServiceInstance = Container.get('EdificioService');
    const edificioServiceSpy = sinon.spy(edificioServiceInstance, 'findAll');

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    let answer = await ctrl.findAll(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 402);
    sinon.assert.calledOnce(edificioServiceSpy);
    sinon.assert.calledWith(edificioServiceSpy);
  });
});
