/* eslint-disable prettier/prettier */
import { expect } from 'chai';
import { DimensaoMaximaPisos } from '../../../../src/domain/edificio/dimensaoMaximaPisos';

describe('DimensaoMaximaPisos Unit Tests', () => {
    it('create valid dimensaoMaximaPisos', () => {
        const largura = 1;
        const comprimento = 1;
        const dimensaoMaximaPisos = DimensaoMaximaPisos.create1(largura,comprimento);
        expect(dimensaoMaximaPisos.isSuccess).to.equal(true);
    });

    it('fail to create dimensaoMaximaPisos with largura', () => {
        const largura = -1;
        const comprimento = 1;
        const descricao = DimensaoMaximaPisos.create1(largura,comprimento);
        expect(descricao.isFailure).to.equal(true);
    });

    it('fail to create dimensaoMaximaPisos with negative comprimento', () => {
        const largura = 1;
        const comprimento = -1;
        const descricao = DimensaoMaximaPisos.create1(largura,comprimento);
        expect(descricao.isFailure).to.equal(true);
    });
});
