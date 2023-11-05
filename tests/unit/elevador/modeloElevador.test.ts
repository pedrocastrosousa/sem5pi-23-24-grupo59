import { expect } from 'chai';
import { ModeloElevador } from '../../../src/domain/elevador/modeloElevador';

describe('ModeloElevador Unit Tests', () => {

    it('Criar um modelo válida', () => {
        const value = 'modelo';
        const modelo = ModeloElevador.create(value);
        expect(modelo.getValue().value).to.equal(value);
    });

    it('Criar um modelo vazia é válido', () => {
        const value = ' ';
        const modelo = ModeloElevador.create(value!);
        expect(modelo.getValue().value).to.equal(' ');
    });

    it('Criar um modelo nula resulta na modelo vazia', () => {
        const value = null;
        const modelo = ModeloElevador.create(value!);
        expect(modelo.getValue().value).to.equal('');
    });

    it('Criar um modelo undefined resulta na modelo vazia', () => {
        const value = undefined;
        const modelo = ModeloElevador.create(value!);
        expect(modelo.getValue().value).to.equal('');
    });

    it('Criar modelo com 50 caracteres', () => {
        const value = "x".repeat(50);
        const modelo = ModeloElevador.create(value);
        expect(modelo.isSuccess).to.equal(true);
    });

    it('Erro ao criar modelo com 51 caracteres', () => {
        const value = "x".repeat(51);
        const modelo = ModeloElevador.create(value);
        expect(modelo.isFailure).to.equal(true);
    });

    it('Criar modelo com letra', () => {
        const value = "A";
        const modelo = ModeloElevador.create(value);
        expect(modelo.getValue().value).to.equal(value);
      });
    
      it('Criar modelo com número', () => {
        const value = "1";
        const modelo = ModeloElevador.create(value);
        expect(modelo.getValue().value).to.equal(value);
      });
    
      it('Erro ao criar modelo com valor não alfa numérico', () => {
        const value = "?";
        const modelo = ModeloElevador.create(value);
        expect(modelo.isFailure).to.equal(true);
      });
});