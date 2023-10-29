import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IEdificioPersistence } from '../dataschema/IEdificioPersistence';

import IEdificioDTO from '../dto/IEdificioDTO';
import { Edificio } from '../domain/edificio/edificio';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { DescricaoEdificio } from '../domain/edificio/descricaoEdificio';
import { NomeEdificio } from '../domain/edificio/nomeEdificio';
import { DimensaoMaximaPisos } from '../domain/edificio/dimensaoMaximaPisos';
import { CodigoEdificio } from '../domain/edificio/codigoEdificio';

export class EdificioMap extends Mapper<Edificio> {
  public static toDTO(edificio: Edificio): IEdificioDTO {
    const nomeEdificio = edificio.nomeEdificio ? edificio.nomeEdificio.nome : null;

    return {
      codigoEdificio: edificio.codigoEdificio.toValue(),
      descricaoEdificio: edificio.descricaoEdificio.descricao,
      nomeEdificio: nomeEdificio,
      dimensaoMaximaPisos: {
        largura: edificio.dimensaoMaximaPisos.largura,
        comprimento: edificio.dimensaoMaximaPisos.comprimento,
      },
    } as IEdificioDTO;
  }

  public static async toDomain(raw: any): Promise<Edificio> {
    const codigoOrError = CodigoEdificio.create(raw.codigoEdificio).getValue();
    const descricaoOrError = DescricaoEdificio.create(raw.descricaoEdificio).getValue();
    const nomeOrError = NomeEdificio.create(raw.nomeEdificio).getValue();
    const comprimento = raw.dimensaoMaximaPisos.comprimento;
    const largura = raw.dimensaoMaximaPisos.largura;
    const dimensoesOrError = DimensaoMaximaPisos.create1(largura, comprimento);

    const edificioOrError = Edificio.create({
      codigoEdificio: codigoOrError,
      descricaoEdificio: descricaoOrError,
      nomeEdificio: nomeOrError,
      dimensaoMaximaPisos: dimensoesOrError.getValue(),
    });

    edificioOrError.isFailure ? console.log(edificioOrError.error) : '';
    return edificioOrError.isSuccess ? edificioOrError.getValue() : null;
  }

  public static toPersistence(edificio: Edificio): any {
    const nomeEdificio = edificio.nomeEdificio ? edificio.nomeEdificio.nome : null;

    return {
      domainId: edificio.id.toString(),
      codigoEdificio: edificio.codigoEdificio.toValue(),
      descricaoEdificio: edificio.descricaoEdificio.descricao,
      nomeEdificio: nomeEdificio,
      dimensaoMaximaPisos: {
        comprimento: edificio.dimensaoMaximaPisos.props.comprimento,
        largura: edificio.dimensaoMaximaPisos.props.largura,
      },
    };
  }
}
