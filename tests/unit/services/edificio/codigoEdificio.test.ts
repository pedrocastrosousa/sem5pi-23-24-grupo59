/* eslint-disable prettier/prettier */
import { expect } from 'chai';
import { CodigoEdificio } from '../../../../src/domain/edificio/codigoEdificio';

describe('CodigoEdificio Unit Tests', () => {
    it('create valid codigoEdificio', () => {
        const value = 'AB123';
        const codigo = CodigoEdificio.create(value);
        expect(codigo.isSuccess).to.equal(true);
    });

    it('fail to create codigoEdificio with empty string', () => {
        const value = '';
        const codigo = CodigoEdificio.create(value);
        expect(codigo.isFailure).to.equal(true);
    });

    it('fail to create codigoEdificio with null string', () => {
        const value = null;
        const codigo = CodigoEdificio.create(value);
        expect(codigo.isFailure).to.equal(true);
    });

    it('fail to create codigoEdificio with undefined string', () => {
        const value = undefined;
        const codigo = CodigoEdificio.create(value);
        expect(codigo.isFailure).to.equal(true);
    });

    it('fail to create codigoEdificio with more than 5 characters', () => {
        const value = 'AA12345';
        const codigo = CodigoEdificio.create(value);
        expect(codigo.isFailure).to.equal(true);
    });

    it('fail to create codigoEdificio with special characters', () => {
        const value = 'A@1!';
        const codigo = CodigoEdificio.create(value);
        expect(codigo.isFailure).to.equal(true);
    });
});
