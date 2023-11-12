import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../src/core/logic/Result';
import IRobotService from '../../../../src/services/IServices/IRobotService';
import RobotController from '../../../../src/controllers/robotController';
import {IRobotDTO} from '../../../../src/dto/IRobotDTO';

describe('unit tests - robot controller', function() {
  const sandbox = sinon.createSandbox();
  let tipoRobotStub;
  beforeEach(function() {
    this.timeout(6000);
    Container.reset();
    let robotSchemaInstance = require('../../../../src/persistence/schemas/robotSchema').default;
    Container.set('robotSchema', robotSchemaInstance);
    let tipoRobotSchemaInstance = require('../../../../src/persistence/schemas/tipoRobotSchema').default;
    Container.set('tipoRobotSchema', tipoRobotSchemaInstance);
    let robotRepoClass = require('../../../../src/repos/robotRepo').default;
    let robotRepoInstance = Container.get(robotRepoClass);
    Container.set('RobotRepo', robotRepoInstance);
    let tipoRobotRepoClass = require('../../../../src/repos/tipoRobotRepo').default;
    let tiopRobotRepoInstance = Container.get(tipoRobotRepoClass);
    Container.set('TipoRobotRepo', tiopRobotRepoInstance);
    let robotServiceClass = require('../../../../src/services/robotService').default;
    let robotServiceInstance = Container.get(robotServiceClass);
    Container.set('RobotService', robotServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('listarRobots - robotController unit test using robotService stub', async function() {
    // Arrange
    let body = [
      {
        id:'',
        codigo: 'R001',
        nickname: 'Robot1',
        tipo: tipoRobotStub,
        numeroSerie: '123456789',
        estado: 'Ativo',
      },
    ];


    let req: Partial<Request> = {};

    let res: Partial<Response> = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    let next: Partial<NextFunction> = () => {};

    let robotServiceInstance = Container.get('RobotService');

    sinon
      .stub(robotServiceInstance, 'getRobots')
      .returns(Promise.resolve(Result.ok<IRobotDTO[]>(body as IRobotDTO[])));

    const ctrl = new RobotController(robotServiceInstance as IRobotService);

    // Act
    await ctrl.listarRobots(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, body);
  });




  it('criar robot - robotController unit test using robotService stub', async function() {
    // Arrange
    let body = [
      {
        id:'',
        codigo: 'R001',
        nickname: 'Robot1',
        tipo: tipoRobotStub,
        numeroSerie: '123456789',
        estado: 'Ativo',
      },
    ];

    let req: Partial<Request> = {};

    let res: Partial<Response> = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    let next: Partial<NextFunction> = () => {};

    let robotServiceInstance = Container.get('RobotService');

    sinon
      .stub(robotServiceInstance, 'createRobot')
      .returns(Promise.resolve(Result.ok<IRobotDTO[]>(body as IRobotDTO[])));

    const ctrl = new RobotController(robotServiceInstance as IRobotService);

    // Act
    await ctrl.createRobot(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, body);
  });




  it('inibir robot - robotController unit test using robotService stub', async function() {
    // Arrange
    let body = [
      {
        id:'',
        codigo: 'R001',
        nickname: 'Robot1',
        tipo: tipoRobotStub,
        numeroSerie: '123456789',
        estado: 'Ativo'
      },
    ];

    let body2 = [
      {
        id:'',
        codigo: 'R001',
        nickname: 'Robot1',
        tipo: tipoRobotStub,
        numeroSerie: '123456789',
        estado: 'Inibido'
      },
    ];

    let req: Partial<Request> = {};

    let res: Partial<Response> = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub(),
    };

    let next: Partial<NextFunction> = () => {};

    let robotServiceInstance = Container.get('RobotService');

    sinon
      .stub(robotServiceInstance, 'inibirRobot')
      .returns(Promise.resolve(Result.ok<IRobotDTO[]>(body2 as IRobotDTO[])));

    const ctrl = new RobotController(robotServiceInstance as IRobotService);

    // Act
    await ctrl.inibirRobot(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.status);
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.status, 200);
    sinon.assert.calledWith(res.json, body2);
  });

});
