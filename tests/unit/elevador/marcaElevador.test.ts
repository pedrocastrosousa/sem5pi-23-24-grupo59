import { expect } from 'chai';
import { MarcaElevador } from '../../../src/domain/elevador/marcaElevador';

describe('MarcaElevador Unit Tests', () => {

    it('Criar uma marca válida', () => {
        const value = 'marca';
        const marca = MarcaElevador.create(value);
        expect(marca.getValue().value).to.equal(value);
    });

    it('Criar uma marca vazia é válido', () => {
        const value = ' ';
        const marca = MarcaElevador.create(value!);
        expect(marca.getValue().value).to.equal(' ');
    });

    it('Criar uma marca nula resulta na marca vazia', () => {
        const value = null;
        const marca = MarcaElevador.create(value!);
        expect(marca.getValue().value).to.equal('');
    });

    it('Criar uma marca undefined resulta na marca vazia', () => {
        const value = undefined;
        const marca = MarcaElevador.create(value!);
        expect(marca.getValue().value).to.equal('');
    });

    it('Criar marca com 50 caracteres', () => {
        const value = "x".repeat(50);
        const marca = MarcaElevador.create(value);
        expect(marca.isSuccess).to.equal(true);
    });

    it('Erro ao criar marca com 51 caracteres', () => {
        const value = "x".repeat(51);
        const marca = MarcaElevador.create(value);
        expect(marca.isFailure).to.equal(true);
    });

    it('Criar marca com letra', () => {
        const value = "A";
        const marca = MarcaElevador.create(value);
        expect(marca.getValue().value).to.equal(value);
      });
    
      it('Criar marca com número', () => {
        const value = "1";
        const marca = MarcaElevador.create(value);
        expect(marca.getValue().value).to.equal(value);
      });
    
      it('Erro ao criar marca com valor não alfa numérico', () => {
        const value = "?";
        const marca = MarcaElevador.create(value);
        expect(marca.isFailure).to.equal(true);
      });
});