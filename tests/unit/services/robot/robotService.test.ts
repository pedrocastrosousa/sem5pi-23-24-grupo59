/*import 'reflect-metadata';

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../src/core/logic/Result';
import IEdificioService from "../../../../src/services/IServices/IEdificioService";
import EdificioController from "../../../../src/controllers/edificioController";
import IEdificioDTO from '../../../../src/dto/IEdificioDTO';
import { RobotMap } from '../../../../src/mappers/RobotMap';
import { Robot } from '../../../../src/domain/robot/robot';
import IRobotRepo from "../../../../src/services/IRepos/IRobotRepo";
import RobotService from "../../../../src/services/robotService";
import ITipoRobotRepo from "../../../../src/services/IRepos/ITipoRobotRepo";
import { TipoRobot } from '../../../../src/domain/tipoRobot/tipoRobot';
import { DesignacaoTipoRobot } from '../../../../src/domain/tipoRobot/designacaoTipoRobot';
import { TipoTarefaTipoRobot } from '../../../../src/domain/tipoRobot/tipoTarefaTipoRobot';

describe('RobotService Unit Tests', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    this.timeout(6000);
    Container.reset();
    let robotSchemaInstance = require('../../../../src/persistence/schemas/robotSchema').default;
    Container.set('robotSchema', robotSchemaInstance);

    let robotRepoClass = require('../../../../src/repos/robotRepo').default;
    let robotRepoInstance = Container.get(robotRepoClass);
    Container.set('RobotRepo', robotRepoInstance);

    Container.reset();
    let tipoRobotSchemaInstance = require('../../../../src/persistence/schemas/tipoRobotSchema').default;
    Container.set('tipoRobotSchema', tipoRobotSchemaInstance);

    let tipoRobotRepoClass = require('../../../../src/repos/tipoRobotRepo').default;
    let tipoRobotRepoInstance = Container.get(tipoRobotRepoClass);
    Container.set('TipoRobotRepo', tipoRobotRepoInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('findAll - success', async function() {
    // Arrange
    let tipoRobot;

    let body = [
      {
        id: '',
        codigo: 'R001',
        nickname: 'Robot1',
        tipo: tipoRobot,
        numeroSerie: '123456789',
        estado: 'Ativo',
      },
      {
        id: '',
        codigo: 'R001',
        nickname: 'Robot1',
        tipo: tipoRobot,
        numeroSerie: '123456789',
        estado: 'Ativo',
      },
    ];

    let robotRepoInstance = Container.get('RobotRepo');
    let tipoRobotRepoInstance = Container.get('TipoRobotRepo');

    let robots: Robot[] = [];
    body.forEach(async robot => {
      robots.push(await RobotMap.toDomain(robot));
    });

    console.log(robots)

    sinon.stub(robotRepoInstance, 'findAll').returns(robots as Array<Robot>);

    const robotService = new RobotService(robotRepoInstance as IRobotRepo, tipoRobotRepoInstance as ITipoRobotRepo);
    const answer = await robotService.getRobots();
    console.log(answer)

    expect(answer.getValue().length).to.equal(2);
    expect(answer.getValue()).to.deep.equal(body);
  });
});*/