import 'reflect-metadata';
import { expect } from 'chai';
import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../../src/core/logic/Result';
import IEdificioRepo from '../../../../../src/services/IRepos/IEdificioRepo';
import EdificioService from '../../../../../src/services/edificioService';
import IEdificioDTO from '../../../../../src/dto/IEdificioDTO';
import { Edificio } from '../../../../../src/domain/edificio/edificio';
import { EdificioMap } from '../../../../../src/mappers/EdificioMap';

describe('unit tests - edificio service', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
    this.timeout(6000);
    Container.reset();
    let edificioSchemaInstance = require('../../../../../src/persistence/schemas/edificioSchema').default;
    Container.set('edificioSchema', edificioSchemaInstance);

    let edificioRepoClass = require('../../../../../src/repos/edificioRepo').default;
    let edificioRepoInstance = Container.get(edificioRepoClass);
    Container.set('EdificioRepo', edificioRepoInstance);

    let edificioServiceClass = require('../../../../../src/services/edificioService').default;
    let edificioServiceInstance = Container.get(edificioServiceClass);
    Container.set('EdificioService', edificioServiceInstance);
  });

  afterEach(function() {
    sandbox.restore();
  });

  it('createEdificio - returns 201', async function() {
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

    let edificioRepoInstance = Container.get('EdificioRepo');
    sinon.stub(edificioRepoInstance, 'findByCodigo').returns(Promise.resolve(null));
    sinon.stub(edificioRepoInstance, 'save').returns(Promise.resolve(body));

    const edificioService = new EdificioService(edificioRepoInstance as IEdificioRepo);

    // Act
    const answer = await edificioService.createEdificio(body as IEdificioDTO);

    // Assert
    expect(answer.getValue().codigoEdificio).to.equal(body.codigoEdificio);
  });

  it('createEdificio - fail', async function() {
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

    let edificioRepoInstance = Container.get('EdificioRepo');
    sinon.stub(edificioRepoInstance, 'findByCodigo').returns(Promise.resolve(body));

    const edificioService = new EdificioService(edificioRepoInstance as IEdificioRepo);

    // Act
    const answer = await edificioService.createEdificio(body as IEdificioDTO);

    // Assert
    expect(answer.errorValue()).to.equal('Ja existe um edificio com o codigo inserido!');
  });

  it('updateEdificio - success', async function() {
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

    let edificioRepoInstance = Container.get('EdificioRepo');
    sinon.stub(edificioRepoInstance, 'findByCodigo').returns(EdificioMap.toDomain(body));
    sinon.stub(edificioRepoInstance, 'save').returns(Promise.resolve(body));

    const edificioService = new EdificioService(edificioRepoInstance as IEdificioRepo);

    // Act
    const answer = await edificioService.updateEdificio(body as IEdificioDTO);

    // Assert
    expect(answer.getValue().codigoEdificio).to.equal(body.codigoEdificio);
    expect(answer.getValue().descricaoEdificio).to.equal(body.descricaoEdificio);
    expect(answer.getValue().nomeEdificio).to.equal(body.nomeEdificio);
    expect(answer.getValue().dimensaoMaximaPisos).to.deep.equal(body.dimensaoMaximaPisos);
  });

  it('updateEdificio - fail', async function() {
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

    let edificioRepoInstance = Container.get('EdificioRepo');
    sinon.stub(edificioRepoInstance, 'findByCodigo').returns(Promise.resolve(null));

    const edificioService = new EdificioService(edificioRepoInstance as IEdificioRepo);

    // Act
    const answer = await edificioService.updateEdificio(body as IEdificioDTO);

    // Assert
    expect(answer.errorValue()).to.equal('Edificio not found');
  });

  it('findAll - success', async function() {
    // Arrange
    let body = [
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
    ];

    let edificioRepoInstance = Container.get('EdificioRepo');

    let edificios: Edificio[] = [];
    body.forEach(async edificio => {
      edificios.push(await EdificioMap.toDomain(edificio));
    });

    sinon.stub(edificioRepoInstance, 'findAll').returns(edificios);

    const edificioService = new EdificioService(edificioRepoInstance as IEdificioRepo);
    const answer = await edificioService.findAll();

    expect(answer.getValue().length).to.equal(2);
    expect(answer.getValue()).to.deep.equal(body);
  });
});
