import 'reflect-metadata';

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import ITipoRobotDTO from '../../../../../src/dto/ITipoRobotDTO';
import { TipoRobotMap } from '../../../../../src/mappers/TipoRobotMap';
import TipoRobotepo from '../../../../../src/repos/tipoRobotRepo';
import { ITipoRobotPersistence } from '../../../../../src/dataschema/ITipoRobotPersistence';
import { Document } from 'mongoose';

describe('unit tests - tipoRobot repo', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    this.timeout(3000);
    Container.reset();

    let tipoRobotSchemaInstance = require('../../../../../src/persistence/schemas/tipoRobotSchema').default;
    Container.set('tipoRobotSchema', tipoRobotSchemaInstance);
  });

  afterEach(function() {
    sandbox.restore();
    sinon.restore();
  });

  it('exists - should return true', async function() {
    // Arrange
    let tipoRobotDTO = {
      designacaoTipoRobot: 'designacao',
      tipoTarefaTipoRobot: ['Vigilancia'],
    } as ITipoRobotDTO;

    let tipoRobotSchemaInstance = Container.get('tipoRobotSchema');
    sinon.stub(tipoRobotSchemaInstance, 'findOne').returns(true);

    const tipoRobotRepo = new TipoRobotepo(tipoRobotSchemaInstance as any);
    const tipoRobot = await TipoRobotMap.toDomain(tipoRobotDTO);

    // Act
    const answer = await tipoRobotRepo.exists(tipoRobot);

    // Assert
    expect(answer).to.be.true;
  });

  it('save - creates tipoRobot', async function() {
    // Arrange
    let tipoRobotDTO = {
      domainId: '',
      designacaoTipoRobot: 'designacao',
      tipoTarefaTipoRobot: ['Vigilancia'],
    } as ITipoRobotPersistence;

    let tipoRobotSchemaInstance = Container.get('tipoRobotSchema');
    const tipoRobot = await TipoRobotMap.toDomain(tipoRobotDTO);

    sinon.stub(tipoRobotSchemaInstance, 'findOne').returns(null);
    sinon.stub(tipoRobotSchemaInstance, 'create').returns(tipoRobotDTO as ITipoRobotPersistence);

    const tipoRobotRepo = new TipoRobotepo(tipoRobotSchemaInstance as any);

    // Act
    const answer = await tipoRobotRepo.save(tipoRobot);

    // Assert
    expect(answer.designacaoTipoRobot.designacao).to.equal(tipoRobot.designacaoTipoRobot.designacao);
    expect(answer.tipoTarefaTipoRobot.tipoTarefa).to.deep.equal(tipoRobot.tipoTarefaTipoRobot.tipoTarefa);
  });

  it('save - finds the existent tipoRobot', async () => {
    // Arrange
    const tipoRobotDTO = {
      domainId: '',
      designacaoTipoRobot: 'designacao',
      tipoTarefaTipoRobot: ['Vigilancia'],
      save() {
        return this;
      },
    } as ITipoRobotPersistence & Document<any, any, any>;

    const tipoRobotDTO2 = {
      domainId: '',
      designacaoTipoRobot: 'a',
      tipoTarefaTipoRobot: ['Vigilancia'],
    } as ITipoRobotPersistence;

    let tipoRobotSchemaInstance = Container.get('tipoRobotSchema');
    const tipoRobot = await TipoRobotMap.toDomain(tipoRobotDTO2);

    sinon.stub(tipoRobotSchemaInstance, 'findOne').returns(tipoRobotDTO);

    const tipoRobotRepo = new TipoRobotepo(tipoRobotSchemaInstance as any);

    // Act
    const answer = await tipoRobotRepo.save(tipoRobot);

    // Assert
    expect(answer.designacaoTipoRobot.designacao).to.equal(tipoRobot.designacaoTipoRobot.designacao);
    expect(answer.tipoTarefaTipoRobot.tipoTarefa).to.deep.equal(tipoRobot.tipoTarefaTipoRobot.tipoTarefa);
  });
});
