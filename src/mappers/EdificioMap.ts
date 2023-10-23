import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { IEdificioPersistence } from '../dataschema/IEdificioPersistence';

import IEdificioDTO from '../dto/IEdificioDTO';
import { Edificio } from '../domain/edificio/edificio';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { DescricaoEdificio } from '../domain/edificio/descricaoEdificio';
import { NomeEdificio } from '../domain/edificio/nomeEdificio';
import { DimensaoMaximaPisos } from '../domain/edificio/dimensaoMaximaPisos';

export class EdificioMap extends Mapper<Edificio> {
  public static toDTO(edificio: Edificio): IEdificioDTO {
    return {
      id: edificio.id.toString(),
      descricaoEdificio: edificio.descricaoEdificio.descricao,
      nomeEdificio: edificio.nomeEdificio.nome,
      dimensaoMaximaPisos: {
        largura: edificio.dimensaoMaximaPisos.largura,
        comprimento: edificio.dimensaoMaximaPisos.comprimento,
      },
    };
  }

  public static toDomain(edificio: any | Model<IEdificioPersistence & Document>): Edificio {
    const descricaoEdificio = DescricaoEdificio.create(edificio.descricaoEdificio.descricao);
    const nomeEdificio = NomeEdificio.create(edificio.nomeEdificio.nome);
    const dimensaoMaximaPisos = DimensaoMaximaPisos.create(edificio.dimensaoMaximaPisos);
    const edificioOrError = Edificio.create(
      {
        descricaoEdificio: descricaoEdificio.getValue(),
        nomeEdificio: nomeEdificio.getValue(),
        dimensaoMaximaPisos: dimensaoMaximaPisos.getValue(),
      },
      new UniqueEntityID(edificio.id),
    );

    edificioOrError.isFailure ? console.log(edificioOrError.error) : '';

    return edificioOrError.isSuccess ? edificioOrError.getValue() : null;
  }

  public static toPersistence(edificio: Edificio): any {
    return {
      domainId: edificio.id.toString(),
      name: edificio.nomeEdificio,
    };
  }
}
