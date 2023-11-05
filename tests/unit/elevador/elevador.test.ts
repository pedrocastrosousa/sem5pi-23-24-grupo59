import { expect } from 'chai';
import sinon from 'sinon';
import { Elevador } from '../../../src/domain/elevador/elevador';
import { Edificio } from '../../../src/domain/edificio/edificio';
import { Piso } from '../../../src/domain/piso/piso';
import { NumeroIdentificativo } from '../../../src/domain/elevador/numeroIdentificativo';
import { NumeroSerieElevador } from '../../../src/domain/elevador/numeroSerieElevador';
import { MarcaElevador } from '../../../src/domain/elevador/marcaElevador';
import { ModeloElevador } from '../../../src/domain/elevador/modeloElevador';
import { DescricaoElevador } from '../../../src/domain/elevador/descricaoElevador';
import { CodigoEdificio } from '../../../src/domain/edificio/codigoEdificio';
import { NomeEdificio } from '../../../src/domain/edificio/nomeEdificio';
import { DescricaoEdificio } from '../../../src/domain/edificio/descricaoEdificio';
import { DimensaoMaximaPisos } from '../../../src/domain/edificio/dimensaoMaximaPisos';
import { PisoDescricao } from '../../../src/domain/piso/pisoDescricao';

describe('Elevador Unit Tests', () => {

    const numeroIdentificativoExemplo = 'A1';
    const numeroSerieExemplo = 'ABC123';
    const marcaExemplo = 'marcaXPTO';
    const modeloExemplo = 'modeloXPTO';
    const descricaoExemplo = 'teste elevador';


    //--------------------Edificios--------------------
    const edificioAProps = {
        codigoEdificio:  CodigoEdificio.create('AAAAA').getValue(),
        nomeEdificio: NomeEdificio.create('edificio A').getValue(),
        descricaoEdificio: DescricaoEdificio.create('descricao').getValue(),
        dimensaoMaximaPisos: DimensaoMaximaPisos.create1(1,1).getValue(),
    };
    const edificioAExemplo = Edificio.create(edificioAProps);
    
    const edificioBProps = {
        codigoEdificio:  CodigoEdificio.create('BBBBB').getValue(),
        nomeEdificio: NomeEdificio.create('edificio B').getValue(),
        descricaoEdificio: DescricaoEdificio.create('descricao').getValue(),
        dimensaoMaximaPisos: DimensaoMaximaPisos.create1(1,1).getValue(),
    };
    const edificioBExemplo = Edificio.create(edificioBProps);


    //--------------------Pisos--------------------
    const pisoEdiAProps = {
        nome: 'Piso 1',
        descricao: PisoDescricao.create('Descrição do Piso 1 Edi A').getValue(),
        edificio: edificioAExemplo.getValue(),
        codigoPiso: 'Edi-A-Piso-1',
        mapa: 'Mapa',
      };
      const piso1EdiAExemplo = Piso.create(pisoEdiAProps);

    const pisoEdiBProps = {
        nome: 'Piso 1',
        descricao: PisoDescricao.create('Descrição do Piso 1 Edi B').getValue(),
        edificio: edificioBExemplo.getValue(),
        codigoPiso: 'Edi-B-Piso-1',
        mapa: 'Mapa',
      };
      const piso1EdiBExemplo = Piso.create(pisoEdiBProps);

    // let edificioStub;
    // let pisoStub;

    beforeEach(() => {
        // edificioStub = sinon.createStubInstance(Edificio);
        // pisoStub = sinon.createStubInstance(Piso);
    });

    it('Criar um Elevador com todos os atributos válidos', () => {
        const numIdentExemplo: NumeroIdentificativo = NumeroIdentificativo.create(numeroIdentificativoExemplo).getValue();
        const elevadorProps = {
            edificio: edificioAExemplo.getValue(),
            pisos: [piso1EdiAExemplo.getValue()],
            numeroIdentificativo: numIdentExemplo,
            numeroSerie: NumeroSerieElevador.create(numeroSerieExemplo).getValue(),
            marca: MarcaElevador.create(marcaExemplo).getValue(),
            modelo: ModeloElevador.create(modeloExemplo).getValue(),
            descricao: DescricaoElevador.create(descricaoExemplo).getValue(),
        }
        const elevador = Elevador.create(elevadorProps, numIdentExemplo);

        expect(elevador.isSuccess).to.be.true;
    });
    
    it('Erro ao criar um Elevador com um piso noutro edificio', () => {
        const numIdentExemplo: NumeroIdentificativo = NumeroIdentificativo.create(numeroIdentificativoExemplo).getValue();
        const elevadorProps = {
            edificio: edificioAExemplo.getValue(),
            pisos: [piso1EdiBExemplo.getValue()],
            numeroIdentificativo: numIdentExemplo,
            numeroSerie: NumeroSerieElevador.create(numeroSerieExemplo).getValue(),
            marca: MarcaElevador.create(marcaExemplo).getValue(),
            modelo: ModeloElevador.create(modeloExemplo).getValue(),
            descricao: DescricaoElevador.create(descricaoExemplo).getValue(),
        }
        const elevador = Elevador.create(elevadorProps, numIdentExemplo);

        expect(elevador.isSuccess).to.be.false;
    });

    it('Erro ao criar um Elevador sem número identifiactivo', () => {
        expect(() => {
            Elevador.create({
                edificio: edificioAExemplo.getValue(),
                pisos: [piso1EdiAExemplo.getValue()],
                numeroIdentificativo: NumeroIdentificativo.create("").getValue(),
                numeroSerie: NumeroSerieElevador.create(numeroSerieExemplo).getValue(),
                marca: MarcaElevador.create(marcaExemplo).getValue(),
                modelo: ModeloElevador.create(modeloExemplo).getValue(),
                descricao: DescricaoElevador.create(descricaoExemplo).getValue(),
            });
          }).to.throw();
    });

    it('Criar um Elevador sem número de série', () => {
        const numIdentExemplo: NumeroIdentificativo = NumeroIdentificativo.create(numeroIdentificativoExemplo).getValue();
        const elevadorProps = {
            edificio: edificioAExemplo.getValue(),
            pisos: [piso1EdiAExemplo.getValue()],
            numeroIdentificativo: numIdentExemplo,
            numeroSerie: NumeroSerieElevador.create("").getValue(),
            marca: MarcaElevador.create(marcaExemplo).getValue(),
            modelo: ModeloElevador.create(modeloExemplo).getValue(),
            descricao: DescricaoElevador.create(descricaoExemplo).getValue(),
        }
        const elevador = Elevador.create(elevadorProps, numIdentExemplo);

        expect(elevador.isSuccess).to.be.true;
    });
    
    it('Criar um Elevador sem marca', () => {
        const numIdentExemplo: NumeroIdentificativo = NumeroIdentificativo.create(numeroIdentificativoExemplo).getValue();
        const elevadorProps = {
            edificio: edificioAExemplo.getValue(),
            pisos: [piso1EdiAExemplo.getValue()],
            numeroIdentificativo: numIdentExemplo,
            numeroSerie: NumeroSerieElevador.create(numeroSerieExemplo).getValue(),
            marca: MarcaElevador.create("").getValue(),
            modelo: ModeloElevador.create(modeloExemplo).getValue(),
            descricao: DescricaoElevador.create(descricaoExemplo).getValue(),
        }
        const elevador = Elevador.create(elevadorProps, numIdentExemplo);

        expect(elevador.isSuccess).to.be.true;
    });

    it('Criar um Elevador sem modelo', () => {

        const numIdentExemplo: NumeroIdentificativo = NumeroIdentificativo.create(numeroIdentificativoExemplo).getValue();
        const elevadorProps = {
            edificio: edificioAExemplo.getValue(),
            pisos: [piso1EdiAExemplo.getValue()],
            numeroIdentificativo: numIdentExemplo,
            numeroSerie: NumeroSerieElevador.create(numeroSerieExemplo).getValue(),
            marca: MarcaElevador.create(marcaExemplo).getValue(),
            modelo: ModeloElevador.create("").getValue(),
            descricao: DescricaoElevador.create(descricaoExemplo).getValue(),
        }
        const elevador = Elevador.create(elevadorProps, numIdentExemplo);

        expect(elevador.isSuccess).to.be.true;
    });
    
    it('Criar um Elevador sem descrição', () => {
        const numIdentExemplo: NumeroIdentificativo = NumeroIdentificativo.create(numeroIdentificativoExemplo).getValue();
        const elevadorProps = {
            edificio: edificioAExemplo.getValue(),
            pisos: [piso1EdiAExemplo.getValue()],
            numeroIdentificativo: numIdentExemplo,
            numeroSerie: NumeroSerieElevador.create(numeroSerieExemplo).getValue(),
            marca: MarcaElevador.create(marcaExemplo).getValue(),
            modelo: ModeloElevador.create(modeloExemplo).getValue(),
            descricao: DescricaoElevador.create("").getValue(),
        }
        const elevador = Elevador.create(elevadorProps, numIdentExemplo);

        expect(elevador.isSuccess).to.be.true;
    });

});