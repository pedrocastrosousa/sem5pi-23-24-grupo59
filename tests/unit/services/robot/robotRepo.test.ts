/*import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../src/core/logic/Result';
import IRobotService from '../../../../src/services/IServices/IRobotService';
import RobotController from '../../../../src/controllers/robotController';
import RobotRepo from '../../../../src/repos/robotRepo'
import { IRobotDTO } from '../../../../src/dto/IRobotDTO';

describe('unit tests - robot controller', function() {
  const sandbox = sinon.createSandbox();
  let tipoRobotStub;
  beforeEach(function() {
    this.timeout(6000);
    Container.reset();
    let robotMapClass = require('../../../../src/mappers/RobotMap').default;
    let robotMapInstance = Container.get(robotMapClass);
    Container.set('RobotMap', robotMapInstance);
    let robotSchemaInstance = require('../../../../src/persistence/schemas/robotSchema').default;
    Container.set('robotSchema', robotSchemaInstance);
    let tipoRobotSchemaInstance = require('../../../../src/persistence/schemas/tipoRobotSchema').default;
    Container.set('tipoRobotSchema', tipoRobotSchemaInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('findAll - should return a list with the right values', async () => {
    // Arrange
    this.timeout(100000);
    let robots = [
      {
        id: '',
        codigo: 'R001',
        nickname: 'Robot1',
        tipo: tipoRobotStub,
        numeroSerie: '123456789',
        estado: 'Ativo',
      },
    ];

    let robotSchemaInstance = Container.get('robotSchema');
    sinon.stub(robotSchemaInstance, 'find').returns(robots);

    let robotMapInstance = Container.get('RobotMap');
    sinon.stub(robotMapInstance, 'toDomainBulk').returns(robots);

    const robotRepo = new RobotRepo(robotSchemaInstance as any);

    // Act
    const answer = await robotRepo.findAll();

    // Assert
    expect(answer.length).to.equal(1);
  });

});*/