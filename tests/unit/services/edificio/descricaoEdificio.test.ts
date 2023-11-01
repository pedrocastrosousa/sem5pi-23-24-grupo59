import { expect } from 'chai';
import { DescricaoEdificio } from '../../../../src/domain/edificio/descricaoEdificio';

describe('DescricaoEdificio Unit Tests', () => {
  it('create valid descricaoEdificio', () => {
    const value = 'descricao';
    const descricao = DescricaoEdificio.create(value);
    expect(descricao.isSuccess).to.equal(true);
  });

  it('fail to create descricaoEdificio with empty string', () => {
    const value = '';
    const descricao = DescricaoEdificio.create(value);
    expect(descricao.isFailure).to.equal(true);
  });

  it('fail to create descricaoEdificio with null string', () => {
    const value = null;
    const descricao = DescricaoEdificio.create(value);
    expect(descricao.isFailure).to.equal(true);
  });

  it('fail to create descricaoEdificio with undefined string', () => {
    const value = undefined;
    const descricao = DescricaoEdificio.create(value);
    expect(descricao.isFailure).to.equal(true);
  });
});
