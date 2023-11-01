import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../../../../src/core/logic/Result';
import IEdificioService from '../../../../src/services/IServices/IEdificioService';
import EdificioController from '../../../../src/controllers/edificioController';
import IEdificioDTO from '../../../../src/dto/IEdificioDTO';
import { Edificio } from '../../../../src/domain/edificio/edificio';
import { CodigoEdificio } from '../../../../src/domain/edificio/codigoEdificio';
import { DescricaoEdificio } from '../../../../src/domain/edificio/descricaoEdificio';
import { NomeEdificio } from '../../../../src/domain/edificio/nomeEdificio';
import { DimensaoMaximaPisos } from '../../../../src/domain/edificio/dimensaoMaximaPisos';

describe('edificio controller', function() {
  const sandbox = sinon.createSandbox();

  beforeEach(function() {
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

  // teste ao create
  it('edificioController unit test using edificioService stub', async function() {
    
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
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let edificioServiceInstance = Container.get('EdificioService');

    const resultBody: IEdificioDTO = {
        id: '',
        codigoEdificio: req.body.codigoEdificio,
        descricaoEdificio: req.body.descricaoEdificio,
        nomeEdificio: req.body.nomeEdificio,
        dimensaoMaximaPisos: {
          comprimento: req.body.dimensaoMaximaPisos.largura,
          largura: req.body.dimensaoMaximaPisos.comprimento,
        },
      }

    sinon.stub(edificioServiceInstance, 'createEdificio').returns(
      Result.ok<IEdificioDTO>(resultBody),
    );

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match(resultBody),
    );
    
  });

  it('edificioController + edificioService integration test using edificioRepoistory and Edificio stubs', async function() {
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
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    sinon.stub(Edificio, 'create').returns(
      Result.ok({
        codigoEdificio: req.body.codigoEdificio,
        descricaoEdificio: new DescricaoEdificio(req.body.descricaoEdificio),
        nomeEdificio: new NomeEdificio(req.body.nomeEdificio),
        dimensaoMaximaPisos: new DimensaoMaximaPisos({
          largura: req.body.dimensaoMaximaPisos.largura,
          comprimento: req.body.dimensaoMaximaPisos.comprimento,
        }),
      }),
    );
    
    let edificioRepoInstance = Container.get('EdificioRepo');
    sinon.stub(edificioRepoInstance, 'findByCodigo').returns(null);
    sinon.stub(edificioRepoInstance, 'save').returns(
      new Promise<Edificio>((resolve, reject) => {
        resolve(
          Edificio.create({
            codigoEdificio: req.body.codigoEdificio,
            descricaoEdificio: new DescricaoEdificio(req.body.descricaoEdificio),
            nomeEdificio: new NomeEdificio(req.body.nomeEdificio),
            dimensaoMaximaPisos: new DimensaoMaximaPisos({
              largura: req.body.dimensaoMaximaPisos.largura,
              comprimento: req.body.dimensaoMaximaPisos.comprimento,
            }),
          }).getValue(),
        );
      }),
    );

    let edificioServiceInstance = Container.get('EdificioService');

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        codigoEdificio: req.body.codigoEdificio,
        descricaoEdificio: new DescricaoEdificio(req.body.descricaoEdificio),
        nomeEdificio: new NomeEdificio(req.body.nomeEdificio),
        dimensaoMaximaPisos: new DimensaoMaximaPisos({
          largura: req.body.dimensaoMaximaPisos.largura,
          comprimento: req.body.dimensaoMaximaPisos.comprimento,
        }),
      }),
    );
  });

  it('edificioController + edificioService integration test using spy on edificioService', async function() {
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
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let edificioRepoInstance = Container.get('EdificioRepo');
    sinon.stub(edificioRepoInstance, 'save').returns(
      new Promise<Edificio>((resolve, reject) => {
        resolve(
          Edificio.create({
            codigoEdificio: req.body.codigoEdificio,
            descricaoEdificio: req.body.descricaoEdificio,
            nomeEdificio: req.body.nomeEdificio,
            dimensaoMaximaPisos: req.body.dimensaoMaximaPisos,
          }).getValue(),
        );
      }),
    );

    let edificioServiceInstance = Container.get('EdificioService');
    const edificioServiceSpy = sinon.spy(edificioServiceInstance, 'createEdificio');

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        codigoEdificio: req.body.codigoEdificio,
        descricaoEdificio: req.body.descricaoEdificio,
        nomeEdificio: req.body.nomeEdificio,
        dimensaoMaximaPisos: req.body.dimensaoMaximaPisos,
      }),
    );
    sinon.assert.calledOnce(edificioServiceSpy);
    //sinon.assert.calledTwice(edificioServiceSpy);
    sinon.assert.calledWith(
      edificioServiceSpy,
      sinon.match({
        codigoEdificio: req.body.codigoEdificio,
        descricaoEdificio: req.body.descricaoEdificio,
        nomeEdificio: req.body.nomeEdificio,
        dimensaoMaximaPisos: req.body.dimensaoMaximaPisos,
      }),
    );
  });

  it('edificioController unit test using edificioService mock', async function() {
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
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let edificioServiceInstance = Container.get('EdificioService');
    const edificioServiceMock = sinon.mock(edificioServiceInstance, 'createEdificio');
    edificioServiceMock
      .expects('createEdificio')
      .once()
      .withArgs(
        sinon.match({
          codigoEdificio: req.body.codigoEdificio,
          descricaoEdificio: req.body.descricaoEdificio,
          nomeEdificio: req.body.nomeEdificio,
          dimensaoMaximaPisos: {
            comprimento: req.body.dimensaoMaximaPisos.largura,
            largura: req.body.dimensaoMaximaPisos.comprimento,
          },
        }),
      )
      .returns(
        Result.ok<IEdificioDTO>({
          id: '',
          codigoEdificio: req.body.codigoEdificio,
          descricaoEdificio: req.body.descricaoEdificio,
          nomeEdificio: req.body.nomeEdificio,
          dimensaoMaximaPisos: {
            comprimento: req.body.dimensaoMaximaPisos.largura,
            largura: req.body.dimensaoMaximaPisos.comprimento,
          },
        }),
      );

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);

    // Act
    await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

    // Assert
    edificioServiceMock.verify();
    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(
      res.json,
      sinon.match({
        codigoEdificio: req.body.codigoEdificio,
        descricaoEdificio: req.body.descricaoEdificio,
        nomeEdificio: req.body.nomeEdificio,
        dimensaoMaximaPisos: {
          comprimento: req.body.dimensaoMaximaPisos.largura,
          largura: req.body.dimensaoMaximaPisos.comprimento,
        },
      }),
    );
  });

  //-------------------------------------------------------------------------------------------

  it('Criacao de edificio', async function() {
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
      json: sinon.spy(),
    };
    let next: Partial<NextFunction> = () => {};

    let edificioServiceInstance = Container.get('EdificioService');

    const obj = sinon
      .stub(edificioServiceInstance, 'createEdificio')
      .returns(Result.ok<IEdificioDTO>(req.body as IEdificioDTO));

    const ctrl = new EdificioController(edificioServiceInstance as IEdificioService);
    await ctrl.createEdificio(<Request>req, <Response>res, <NextFunction>next);

    sinon.assert.calledOnce(obj);
    sinon.assert.calledWith(obj, sinon.match(body));
  });
});
