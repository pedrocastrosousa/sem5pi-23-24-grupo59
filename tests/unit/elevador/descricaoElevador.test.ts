import { expect } from 'chai';
import { DescricaoElevador } from '../../../src/domain/elevador/descricaoElevador';

describe('DescricaoElevador Unit Tests', () => {
  it('Criar uma descricao válida', () => {
    const value = 'descricao';
    const descricao = DescricaoElevador.create(value);
    expect(descricao.getValue().value).to.equal(value);
  });

  // it('Criar uma descrição com espaços???', () => {
  //   const value = '';
  //   const descricao = DescricaoElevador.create(value);
  //   expect(descricao.isFailure).to.equal(true);
  // });

  it('Criar uma descrição vazia é válido', () => {
    const value = ' ';
    const descricao = DescricaoElevador.create(value!);
    expect(descricao.getValue().value).to.equal(' ');
});

  it('Criar uma descrição nula resulta na descrição vazia', () => {
    const value = null;
    const descricao = DescricaoElevador.create(value!);
    expect(descricao.getValue().value).to.equal('');
  });

  it('Criar uma descrição undefined resulta na descrição vazia', () => {
    const value = undefined;
    const descricao = DescricaoElevador.create(value!);
    expect(descricao.getValue().value).to.equal('');
  });

  it('Criar descrição com 250 caracteres', () => {
    const value = "x".repeat(250);
    const descricao = DescricaoElevador.create(value);
    expect(descricao.isSuccess).to.equal(true);
  });

  it('Erro ao criar descrição com 251 caracteres', () => {
    const value = "x".repeat(251);
    const descricao = DescricaoElevador.create(value);
    expect(descricao.isFailure).to.equal(true);
  });

  it('Criar descrição com letra', () => {
    const value = "A";
    const descricao = DescricaoElevador.create(value);
    expect(descricao.getValue().value).to.equal(value);
  });

  it('Criar descrição com número', () => {
    const value = "1";
    const descricao = DescricaoElevador.create(value);
    expect(descricao.getValue().value).to.equal(value);
  });

  it('Erro ao criar descrição com valor não alfa numérico', () => {
    const value = "?";
    const descricao = DescricaoElevador.create(value);
    expect(descricao.isFailure).to.equal(true);
  });

});