import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../src/core/logic/Result';
import ITipoRobotService from '../../../src/services/IServices/ITipoRobotService';
import TipoRobotController from '../../../src/controllers/tipoRobotController';
import ITipoRobotDTO from '../../../src/dto/ITipoRobotDTO';
import {TipoRobot} from '../../../src/domain/tipoRobot/tipoRobot'

describe('integration test - tipoRobot', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    this.timeout(6000);
    Container.reset();
    let tipoRobotSchemaInstance = require('../../../src/persistence/schemas/tipoRobotSchema').default;
    Container.set('tipoRobotSchema', tipoRobotSchemaInstance);

    let tipoRobotRepoClass = require('../../../src/repos/tipoRobotRepo').default;
    let tipoRobotRepoInstance = Container.get(tipoRobotRepoClass);
    Container.set('TipoRobotRepo', tipoRobotRepoInstance);

    let tipoRobotServiceClass = require('../../../src/services/tipoRobotService').default;
    let tipoRobotServiceInstance = Container.get(tipoRobotServiceClass);
    Container.set('TipoRobotService', tipoRobotServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });
 
  it('createTipoRobot - tipoRobotController + tipoRobotService integration test', async function() {
    // Arrange
    let body = {
      designacaoTipoRobot: 'designacao',
      tipoTarefaTipoRobot: ['Vigilancia'],
    };

    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    let next: Partial<NextFunction> = () => {};

    let tipoRobotRepoInstance = Container.get('TipoRobotRepo');
    sinon.stub(tipoRobotRepoInstance, 'save').returns(Promise.resolve(Result.ok<ITipoRobotDTO>(body as ITipoRobotDTO)));

    let tipoRobotServiceInstance = Container.get('TipoRobotService');
    const tipoRobotServiceSpy = sinon.spy(tipoRobotServiceInstance, 'createTipoRobot');
    const ctrl = new TipoRobotController(tipoRobotServiceInstance as ITipoRobotService);

    // Act
    await ctrl.createTipoRobot(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 201);
    sinon.assert.calledOnce(tipoRobotServiceSpy);
    sinon.assert.calledWith(tipoRobotServiceSpy, body);
    
  });

  /*it('createEdificio - returns 404 (edificio already exists)', async function() {
    // Arrange
    let body = {
      designacaoTipoRobot: 'designacao',
      tipoTarefaTipoRobot: ['Vigilancia'],
    };
    let req: Partial<Request> = {};
    req.body = body;

    let res: Partial<Response> = {
      status: sinon.spy(),
      json: sinon.spy(),
    };

    let next: Partial<NextFunction> = () => {};

    let tipoRobotRepoInstance = Container.get('TipoRobotRepo');
    sinon
      .stub(tipoRobotRepoInstance, 'findByCodigo')
      .returns(Result.fail<TipoRobot>('Ja existe um edificio com o codigo inserido!'));

    let tipoRobotServiceInstance = Container.get('TipoRobotService');
    const edificioServiceSpy = sinon.spy(tipoRobotServiceInstance, 'createEdificio');

    const ctrl = new TipoRobotController(tipoRobotServiceInstance as ITipoRobotService);

    // Act
    await ctrl.createTipoRobot(<Request>req, <Response>res, <NextFunction>next);

    //Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledWith(res.status, 404);
    sinon.assert.calledOnce(edificioServiceSpy);
    sinon.assert.calledWith(edificioServiceSpy, body);
  });*/
});
