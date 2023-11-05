import { expect } from 'chai';
import sinon from 'sinon';
import { UniqueEntityID } from '../../../../src/core/domain/UniqueEntityID';
import { Piso } from '../../../../src/domain/piso/piso';

import { Edificio } from '../../../../src/domain/edificio/edificio';
import { PisoDescricao } from '../../../../src/domain/piso/pisoDescricao';


describe('Piso', () => {
  let edificioStub;

  beforeEach(() => {
    edificioStub = sinon.createStubInstance(Edificio);
  });

  it('deve criar um Piso com sucesso com todos os atributos válidos', () => {
    const pisoProps = {
      nome: 'Piso 1',
      descricao: PisoDescricao.create('Descrição do Piso 1').getValue(),
      edificio: edificioStub,
      codigoPiso: 'Código do Piso 1',
      mapa: 'Mapa do Piso 1',
    };

    const piso = Piso.create(pisoProps, new UniqueEntityID());

    expect(piso.isSuccess).to.be.true;
  });

  it('deve falhar ao criar um Piso sem descrição', () => {
    const pisoProps = {
      nome: 'Piso 1',
      descricao: PisoDescricao.create('').getValue(), // Descrição em branco
      edificio: edificioStub,
      codigoPiso: 'Código do Piso 1',
      mapa: 'Mapa do Piso 1',
    };
  
    const piso = Piso.create(pisoProps, new UniqueEntityID());
  
    expect().to.throw();
  });

  it('deve falhar ao criar um Piso com nome vazio', () => {
    const pisoProps = {
      nome: '', // Nome em branco
      descricao: PisoDescricao.create('Descrição do Piso 1').getValue(),
      edificio: edificioStub,
      codigoPiso: 'Código do Piso 1',
    };

    const piso = Piso.create(pisoProps, new UniqueEntityID());

    expect().to.throw();
  });

  // Adicione mais testes conforme necessário para cobrir outras funcionalidades da classe Piso.
});
