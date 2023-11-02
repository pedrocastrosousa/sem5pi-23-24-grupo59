import { expect } from 'chai';
import { CodigoEdificio } from '../../../../src/domain/edificio/codigoEdificio';
import { DescricaoEdificio } from '../../../../src/domain/edificio/descricaoEdificio';
import { NomeEdificio } from '../../../../src/domain/edificio/nomeEdificio';
import { Edificio } from '../../../../src/domain/edificio/edificio';
import { DimensaoMaximaPisos } from '../../../../src/domain/edificio/dimensaoMaximaPisos';

describe('Edificio test', () => {
  it('create valid Edificio', () => {
    const edificioProps = {
      codigoEdificio:  CodigoEdificio.create('aaa12').getValue(),
      nomeEdificio: NomeEdificio.create('nome').getValue(),
      descricaoEdificio: DescricaoEdificio.create('descricao').getValue(),
      dimensaoMaximaPisos: DimensaoMaximaPisos.create1(1,1).getValue(),
    };
    const edificio = Edificio.create(edificioProps);

    expect(edificio.isSuccess).to.be.true;
  });

  it('create valid Edificio without nomeEdificio', () => {
    const edificioProps = {
      codigoEdificio: CodigoEdificio.create('aaa12').getValue(),
      nomeEdificio: NomeEdificio.create('').getValue(),
      descricaoEdificio: DescricaoEdificio.create('descricao').getValue(),
      dimensaoMaximaPisos: DimensaoMaximaPisos.create1(1, 1).getValue(),
    };
    const edificio = Edificio.create(edificioProps);

    expect(edificio.isSuccess).to.be.true;
  });

  it('fail to create Edificio with invalid codigoEdificio', () => {
    expect(() => {
      Edificio.create(
        {
          codigoEdificio: CodigoEdificio.create('aaa12aaa').getValue(),
          nomeEdificio: NomeEdificio.create('nome').getValue(),
          descricaoEdificio: DescricaoEdificio.create('descricao').getValue(),
          dimensaoMaximaPisos: DimensaoMaximaPisos.create1(1, 1).getValue(),
        },
      );
    }).to.throw();
  });

  it('fail to create Edificio with invalid dimensaoMaximaPisos', () => {
    expect(() => {
      Edificio.create({
        codigoEdificio: CodigoEdificio.create('aaa12').getValue(),
        nomeEdificio: NomeEdificio.create('nome').getValue(),
        descricaoEdificio: DescricaoEdificio.create('descricao').getValue(),
        dimensaoMaximaPisos: DimensaoMaximaPisos.create1(-1, 1).getValue(),
      });
    }).to.throw();
  });

  it('fail to create Edificio without odigoEdificio', () => {
    expect(() => {
      Edificio.create({
        codigoEdificio: CodigoEdificio.create('').getValue(),
        nomeEdificio: NomeEdificio.create('nome').getValue(),
        descricaoEdificio: DescricaoEdificio.create('descricao').getValue(),
        dimensaoMaximaPisos: DimensaoMaximaPisos.create1(1, 1).getValue(),
      });
    }).to.throw();
  });

  it('fail to create Edificio without descricaoedificio', () => {
    expect(() => {
      Edificio.create({
        codigoEdificio: CodigoEdificio.create('aaa12').getValue(),
        nomeEdificio: NomeEdificio.create('nome').getValue(),
        descricaoEdificio: DescricaoEdificio.create('').getValue(),
        dimensaoMaximaPisos: DimensaoMaximaPisos.create1(1, 1).getValue(),
      });
    }).to.throw();
  });

});
