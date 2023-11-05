import 'reflect-metadata';

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../../src/core/logic/Result';
import ITipoRobotRepo from '../../../../../src/services/IRepos/ITipoRobotRepo';
import TipoRobotService from '../../../../../src/services/tipoRobotService';
import ITipoRobotDTO from '../../../../../src/dto/ITipoRobotDTO';

describe('TipoRobotService Unit Tests', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    this.timeout(6000);
    Container.reset();
    let tipoRobotSchemaInstance = require('../../../../..//src/persistence/schemas/tipoRobotSchema').default;
    Container.set('tipoRobotSchema', tipoRobotSchemaInstance);

    let tipoRobotRepoClass = require('../../../../../src/repos/tipoRobotRepo').default;
    let tipoRobotRepoInstance = Container.get(tipoRobotRepoClass);
    Container.set('TipoRobotRepo', tipoRobotRepoInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('createTipoRobot - success', async function() {
    // Arrange
    let body = {
      designacaoTipoRobot: 'designacao',
      tipoTarefaTipoRobot: ['Vigilancia'],
    };

    let tipoRobotRepoInstance = Container.get('TipoRobotRepo');
    sinon.stub(tipoRobotRepoInstance, 'save').returns(Promise.resolve(body));

    const tipoRobotService = new TipoRobotService(tipoRobotRepoInstance as ITipoRobotRepo);

    // Act
    const answer = await tipoRobotService.createTipoRobot(body as ITipoRobotDTO);

    // Assert
    expect(answer.getValue().designacaoTipoRobot).to.equal(body.designacaoTipoRobot);
    expect(answer.getValue().tipoTarefaTipoRobot).to.deep.equal(body.tipoTarefaTipoRobot);
  });
});
