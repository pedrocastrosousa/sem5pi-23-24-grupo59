/* eslint-disable prettier/prettier */
import { expect } from 'chai';
import { NomeEdificio } from '../../../../src/domain/edificio/nomeEdificio';

describe('NomeEdificio Unit Tests', () => {
  it('create valid nomeEdificio (empty)', () => {
    const value = '';
    const nome = NomeEdificio.create(value);
    expect(nome.isSuccess).to.equal(true);
  });

    it('create valid nomeEdificio (not empty)', () => {
        const value = 'nome';
        const nome = NomeEdificio.create(value);
        expect(nome.isSuccess).to.equal(true);
    });

  it('fail to create nomeEdificio with length above limit', () => {
    const value = 'wnenwejnefwjnvenjvfwnevfknjwvefkvnefjnkwwnjvfekjnjk';
    const nome = NomeEdificio.create(value);
    expect(nome.isFailure).to.equal(true);
  });
});
