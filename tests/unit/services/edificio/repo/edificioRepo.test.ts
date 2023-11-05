import 'reflect-metadata';

import { expect } from 'chai';
import * as sinon from 'sinon';
import { Container } from 'typedi';
import { Result } from '../../../../../src/core/logic/Result';
import IEdificioDTO from '../../../../../src/dto/IEdificioDTO';
import { EdificioMap } from '../../../../../src/mappers/EdificioMap';
import EdificioRepo from '../../../../../src/repos/edificioRepo';
import { IEdificioPersistence } from '../../../../../src/dataschema/IEdificioPersistence';
import { Document } from 'mongoose';

describe('unit tests - edificio repo', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    this.timeout(3000);
    Container.reset();

    let edificioSchemaInstance = require('../../../../../src/persistence/schemas/edificioSchema').default;
    Container.set('edificioSchema', edificioSchemaInstance);
  });

  afterEach(function() {
    sandbox.restore();
    sinon.restore();
  });

  it('exists - should return true', async function() {
    // Arrange
    let edificioDTO = {
      codigoEdificio: '99979',
      descricaoEdificio: 'Seguranca',
      nomeEdificio: 'Informatica',
      dimensaoMaximaPisos: {
        largura: 1,
        comprimento: 2,
      },
    } as IEdificioDTO;

    let edificioSchemaInstance = Container.get('edificioSchema');
    sinon.stub(edificioSchemaInstance, 'findOne').returns(true);

    const edificioRepo = new EdificioRepo(edificioSchemaInstance as any);
    const edificio = await EdificioMap.toDomain(edificioDTO);

    // Act
    const answer = await edificioRepo.exists(edificio);

    // Assert
    expect(answer).to.be.true;
  });

  it('save - creates edificio', async function() {
    // Arrange
    let edificioDTO = {
      codigoEdificio: '99979',
      descricaoEdificio: 'Seguranca',
      nomeEdificio: 'Informatica',
      dimensaoMaximaPisos: {
        largura: 1,
        comprimento: 2,
      },
    } as IEdificioPersistence;

    let edificioSchemaInstance = Container.get('edificioSchema');
    const edificio = await EdificioMap.toDomain(edificioDTO);

    sinon.stub(edificioSchemaInstance, 'findOne').returns(null);
    sinon.stub(edificioSchemaInstance, 'create').returns(edificioDTO as IEdificioPersistence);

    const edificioRepo = new EdificioRepo(edificioSchemaInstance as any);

    // Act
    const answer = await edificioRepo.save(edificio);

    // Assert
    expect(answer.codigoEdificio.toValue()).to.equal(edificio.codigoEdificio.toValue());
    expect(answer.descricaoEdificio.descricao).to.equal(edificio.descricaoEdificio.descricao);
    expect(answer.nomeEdificio.nome).to.equal(edificio.nomeEdificio.nome);
    expect(answer.dimensaoMaximaPisos.largura).to.equal(edificio.dimensaoMaximaPisos.largura);
    expect(answer.dimensaoMaximaPisos.comprimento).to.equal(edificio.dimensaoMaximaPisos.comprimento);
  });

  it('save - finds the existent edificio', async () => {
    // Arrange
    const edificioDTO = {
      codigoEdificio: '99979',
      descricaoEdificio: 'Seguranca',
      nomeEdificio: 'Informatica',
      dimensaoMaximaPisos: {
        largura: 1,
        comprimento: 2,
      },
      save() {
        return this;
      },
    } as IEdificioPersistence & Document<any, any, any>;

    const edificioDTO2 = {
      codigoEdificio: '99979',
      descricaoEdificio: 'Informacao',
      nomeEdificio: 'Gestao',
      dimensaoMaximaPisos: {
        largura: 1,
        comprimento: 2,
      },
    } as IEdificioPersistence;

    let edificioSchemaInstance = Container.get('edificioSchema');
    const edificio = await EdificioMap.toDomain(edificioDTO2);

    sinon.stub(edificioSchemaInstance, 'findOne').returns(edificioDTO);

    const edificioRepo = new EdificioRepo(edificioSchemaInstance as any);

    // Act
    const answer = await edificioRepo.save(edificio);

    // Assert
    expect(answer.codigoEdificio.toValue()).to.equal(edificio.codigoEdificio.toValue());
    expect(answer.descricaoEdificio.descricao).to.equal(edificio.descricaoEdificio.descricao);
    expect(answer.nomeEdificio.nome).to.equal(edificio.nomeEdificio.nome);
    expect(answer.dimensaoMaximaPisos.largura).to.equal(edificio.dimensaoMaximaPisos.largura);
    expect(answer.dimensaoMaximaPisos.comprimento).to.equal(edificio.dimensaoMaximaPisos.comprimento);
  });

  it('findByCodigo - should return edifico', async () => {
    // Arrange
    let edificioDTO = {
      codigoEdificio: '99979',
      descricaoEdificio: 'Seguranca',
      nomeEdificio: 'Informatica',
      dimensaoMaximaPisos: {
        largura: 1,
        comprimento: 2,
      },
    };

    let edificioSchemaInstance = Container.get('edificioSchema');
    sinon.stub(edificioSchemaInstance, 'findOne').returns(edificioDTO);

    const edificio = await EdificioMap.toDomain(edificioDTO);
    const edificioRepo = new EdificioRepo(edificioSchemaInstance as any);

    // Act
    const answer = await edificioRepo.findByCodigo(edificioDTO.codigoEdificio);

    // Assert
    expect(answer.codigoEdificio.toValue()).to.equal(edificio.codigoEdificio.toValue());
    expect(answer.descricaoEdificio.descricao).to.equal(edificio.descricaoEdificio.descricao);
    expect(answer.nomeEdificio.nome).to.equal(edificio.nomeEdificio.nome);
    expect(answer.dimensaoMaximaPisos.largura).to.equal(edificio.dimensaoMaximaPisos.largura);
    expect(answer.dimensaoMaximaPisos.comprimento).to.equal(edificio.dimensaoMaximaPisos.comprimento);
  });

  it('findByCodigo - should return null', async () => {
    // Arrange
    let edificioDTO = {
      codigoEdificio: '99979',
      descricaoEdificio: 'Seguranca',
      nomeEdificio: 'Informatica',
      dimensaoMaximaPisos: {
        largura: 1,
        comprimento: 2,
      },
    };

    const edificio = EdificioMap.toDomain(edificioDTO);

    let edificioSchemaInstance = Container.get('edificioSchema');
    sinon.stub(edificioSchemaInstance, 'findOne').returns(null);

    const edificioRepo = new EdificioRepo(edificioSchemaInstance as any);

    // Act
    const answer = await edificioRepo.findByCodigo(edificioDTO.codigoEdificio);

    // Assert
    expect(answer).to.equal(null);
  });

  it('findAll - should return a list with 2 edificios with the right values', async () => {
    // Arrange
    const edificios = [
      {
        codigoEdificio: '95979',
        descricaoEdificio: 'Seguranca',
        nomeEdificio: 'Informatica',
        dimensaoMaximaPisos: {
          largura: 1,
          comprimento: 2,
        },
      },
      {
        codigoEdificio: '81852',
        descricaoEdificio: 'Informacao',
        nomeEdificio: 'Gestao',
        dimensaoMaximaPisos: {
          largura: 2,
          comprimento: 4,
        },
      },
    ] as IEdificioPersistence[];

    let edificioSchemaInstance = Container.get('edificioSchema');
    sinon.stub(edificioSchemaInstance, 'find').returns(edificios);

    const edificioRepo = new EdificioRepo(edificioSchemaInstance as any);

    // Act
    const answer = await edificioRepo.findAll();

    // Assert
    expect(answer.length).to.equal(2);

    for (let i = 0; i < 2; i++) {
      expect(answer[i].codigoEdificio.toValue()).to.equal(edificios[i].codigoEdificio);
      expect(answer[i].descricaoEdificio.descricao).to.equal(edificios[i].descricaoEdificio);
      expect(answer[i].nomeEdificio.nome).to.equal(edificios[i].nomeEdificio);
      expect(answer[i].dimensaoMaximaPisos.largura).to.equal(edificios[i].dimensaoMaximaPisos.largura);
      expect(answer[i].dimensaoMaximaPisos.comprimento).to.equal(edificios[i].dimensaoMaximaPisos.comprimento);
    }
  });
});
