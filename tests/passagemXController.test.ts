import * as sinon from 'sinon';

import { NextFunction, Request, Response } from "express";
import Container from "typedi";
import { Result } from "../src/core/logic/Result";
import { IPassagemDTO } from "../src/dto/IPassagemDTO";
import PassagemController from "../src/controllers/passagemController";

import IPassagemService from "../src/services/IServices/IPassagemService";
import { Passagem } from '../src/domain/passagem/passagem';
import { Piso } from '../src/domain/piso/piso';
import { Edificio } from '../src/domain/edificio/edificio';
import { CodigoEdificio } from '../src/domain/edificio/codigoEdificio';
import { DescricaoEdificio } from '../src/domain/edificio/descricaoEdificio';
import { NomeEdificio } from '../src/domain/edificio/nomeEdificio';
import { DimensaoMaximaPisos } from '../src/domain/edificio/dimensaoMaximaPisos';
import { PisoDescricao } from '../src/domain/piso/pisoDescricao';
import { UniqueEntityID } from '../src/core/domain/UniqueEntityID';


describe("Testing Passagem Controller", function () {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
        Container.reset();
        let passagemSchemaInstance = require("../src/persistence/schemas/passagemSchema").default;
        Container.set("passagemSchema", passagemSchemaInstance);

        let pisoSchemaInstance = require("../src/persistence/schemas/pisoSchema").default;
        Container.set("pisoSchema", pisoSchemaInstance);

        let edificioSchemaInstance = require("../src/persistence/schemas/edificioSchema").default;
        Container.set("edificioSchema", edificioSchemaInstance);

        let passagemRepoClass = require("../src/repos/passagemRepo").default;
        let passagemRepoInstance = Container.get(passagemRepoClass);
        Container.set("PassagemRepo", passagemRepoInstance);

        let pisoRepoClass = require("../src/repos/pisoRepo").default;
        let pisoRepoInstance = Container.get(pisoRepoClass);
        Container.set("PisoRepo", pisoRepoInstance);

        let edificioRepoClass = require("../src/repos/edificioRepo").default;
        let edificioRepoInstance = Container.get(edificioRepoClass);
        Container.set("EdificioRepo", edificioRepoInstance);

        let passagemServiceClass = require("../src/services/passagemService").default;
        let passagemServiceInstance = Container.get(passagemServiceClass);
        Container.set("PassagemService", passagemServiceInstance);
   sinon.restore();
    });

    afterEach(function () {
        sandbox.restore();
    });

    const validEdificio = Edificio.create({
        codigoEdificio: CodigoEdificio.create("AAAAA").getValue(),
        descricaoEdificio: DescricaoEdificio.create("edificio A").getValue(),
        nomeEdificio: NomeEdificio.create("Edificio A").getValue(),
        dimensaoMaximaPisos: DimensaoMaximaPisos.create({ comprimento: 10, largura: 10 }).getValue()
    }).getValue();

    const validEdificio1 = Edificio.create({
        codigoEdificio: CodigoEdificio.create("BBBBB").getValue(),
        descricaoEdificio: DescricaoEdificio.create("edificio B").getValue(),
        nomeEdificio: NomeEdificio.create("Edificio B").getValue(),
        dimensaoMaximaPisos: DimensaoMaximaPisos.create({ comprimento: 10, largura: 10 }).getValue()
    }).getValue();

    const validPiso = Piso.create({
        nome: "Piso1",
        descricao: PisoDescricao.create("Piso 1").getValue(),
        edificio: validEdificio,
        codigoPiso: "1",
    }, new UniqueEntityID("6bfd9c9b-b8a8-444b-b4c8-d18fa4bca709")).getValue();

    const validPiso2 = Piso.create({
        nome: "Piso2",
        descricao: PisoDescricao.create("Piso 1").getValue(),
        edificio: validEdificio1,
        codigoPiso: "2",
    }, new UniqueEntityID("6bfd9c9b-b8a8-444b-b4c8-d18fa4bca712")).getValue();


    const validPiso3 = Piso.create({
        nome: "Piso3",
        descricao: PisoDescricao.create("Piso 1").getValue(),
        edificio: validEdificio,
        codigoPiso: "3",
    }, new UniqueEntityID("6bfd9c9b-b8a8-444b-b4c8-d18fa4bca712")).getValue();

    const validPassagem = Passagem.create({
        piso1: validPiso,
        piso2: validPiso2,
        codigoPassagem: "1e2"
    }, new UniqueEntityID("43a4f0f7-a59e-4425-a7f0-3f45d272cd09")).getValue();

    const validPassagem2 = Passagem.create({
        piso1: validPiso2,
        piso2: validPiso3,
        codigoPassagem: "2e3"
    }, new UniqueEntityID("43a4f0f7-a59e-4425-a7f0-3f45d272cd09")).getValue();


    it('passagemController unit test using passagemService stub - create valid request', async function () {
        // Arrange
        let body = {
            "piso1": validPiso,
            "piso2": validPiso2
        }
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };
        let passagemServiceInstance = Container.get("PassagemService");
        sinon.stub(passagemServiceInstance, "createPassagem").returns(Result.ok<IPassagemDTO>({ "id": "passagem", "piso1": req.body.piso1, "piso2": req.body.piso2, "codigoPassagem": "passagem1e2" }))

        const crtl = new PassagemController(passagemServiceInstance as IPassagemService);


        //Act

        await crtl.createPassagem(<Request>req, <Response>res, <NextFunction>next);


        //Assert
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "id": "passagem", "piso1": req.body.piso1, "piso2": req.body.piso2, "codigoPassagem": "passagem1e2" }));
    });



    it('passagemController unit test using passagemService stub - create invalid request', async function () {
        // Arrange
        let body = {
            "piso1": validPiso,
            "piso2": validPiso2
        }
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sandbox.spy(),
            status: sandbox.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let passagemServiceInstance = Container.get("PassagemService");
        sandbox.stub(passagemServiceInstance, "createPassagem").returns(
            Result.fail<IPassagemDTO>("invalid request"));

        const crtl = new PassagemController(passagemServiceInstance as IPassagemService);
        //Act
        await crtl.createPassagem(<Request>req, <Response>res, <NextFunction>next);

        //Assert
        sandbox.assert.notCalled(res.json);
        sandbox.assert.calledOnce(res.status);
        sandbox.assert.calledWith(res.status, 400)
    });

    it('passagemController unit test using passagemService mock', async function () {
        //Arrange

        let body = {
            "piso1": validPiso,
            "piso2": validPiso2
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sinon.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let passagemServiceInstance = Container.get("PassagemService");
        const passagemServicceMock = sinon.mock(passagemServiceInstance, "createPassagem")
        passagemServicceMock.expects("createPassagem")
            .once()
            .withArgs(sinon.match({ piso1: req.body.piso1, piso2: req.body.piso2 }))
            .returns(Result.ok<IPassagemDTO>({ "id": "123", "piso1": req.body.piso1, "piso2": req.body.piso2, "codigoPassagem": "1 e 2" }));

        const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);
        //Act
        await ctrl.createPassagem(<Request>req, <Response>res, <NextFunction>next);

        //Assert
        passagemServicceMock.verify();
        sinon.assert.calledOnce(res.json);
        sinon.assert.calledWith(res.json, sinon.match({ "id": "123", "piso1": req.body.piso1, "piso2": req.body.piso2, "codigoPassagem": "1 e 2" }));
    });

        it('passagemController + passagemService integration test using spy on passagemService', async function () {
            //Arrange
            let body = {
                "piso1": validPiso,
                "piso2": validPiso2
            };
            let req: Partial<Request> = {};
            req.body = body;
            let res: Partial<Response> = {
                json: sinon.spy()
            };
            let next: Partial<NextFunction> = () => { };
    
            let passagemRepoInstance = Container.get("PassagemRepo");
            sinon.stub(passagemRepoInstance, "save").returns(new Promise<Passagem>((resolve, reject) => {
                resolve(Passagem.create({ "piso1": req.body.piso1, "piso2": req.body.piso2, "codigoPassagem": "1 e 2" }).getValue())
            }));
            let passagemServiceInstance = Container.get("PassagemService");
            const passagemServiceSpy = sinon.spy(passagemServiceInstance, "createPassagem");
    
            const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);
            //Act 
            await ctrl.createPassagem(<Request>req, <Response>res, <NextFunction>next);
    
            //sinon.assert.calledOnce(res.status);
           // sinon.assert.calledWith(res.status, 201);
            sinon.assert.calledOnce(passagemServiceSpy);
            sinon.assert.calledWith(passagemServiceSpy, sinon.match({ piso1: req.body.piso1, piso2: req.body.piso2 }));
    
        });
  
/*
// CONTROLLER + SERVICE PASSAGEM CREATE
    // VALID REQUEST
    it('passagemController + passagemService integration test using PassagemRepo and Passagem stubs - create valid request', async function () {

        // Arrange	
        const piso1 = validPiso;
        const piso2 = validPiso2;
        let body = {
            "piso1": piso1,
            "piso2": piso2,
            "codigoPassagem": "1e2"
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sandbox.spy()
        };
        let next: Partial<NextFunction> = () => { };

        sandbox.stub(Passagem, "create").returns(Result.ok({
            "id": "123",
            "piso1": piso1,
            "piso2": piso2,
            "codigoPassagem": "1e2"
        }));

        let pisoRepoInstance = Container.get("PisoRepo");
        sandbox.stub(pisoRepoInstance, "findByCodigo").returns(new Promise<Piso>((resolve, reject) => {
            resolve(piso1)
            resolve(piso2)
        }));
       
        let passagemRepoInstance = Container.get("PassagemRepo");
        sandbox.stub(passagemRepoInstance, "save").returns(new Promise<Passagem>((resolve, reject) => {
            resolve(Passagem.create({
                "piso1": piso1,
                "piso2": piso2,
                "codigoPassagem": "1e2"
            }).getValue())
        }));

        let passagemServiceInstance = Container.get("PassagemService");

        const ctrl = new PassagemController(passagemServiceInstance as IPassagemService);
        // Act
        await ctrl.createPassagem(<Request>req, <Response>res, <NextFunction>next);
        // Assert
        res.json = sandbox.spy((response) => {
            console.log('res.json called with:', response);
          });
        sandbox.assert.calledOnce(res.json);
        sandbox.assert.calledWith(res.json, sandbox.match({
            "id": "123",
            "piso1": req.body.piso1,
            "piso2": req.body.piso2,
            "codigoPassagem": "1e2"
        }));
    });
*/

});


