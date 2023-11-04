import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ISalaPersistence } from "../dataschema/ISalaPersistence";
import { Sala } from "../domain/sala/sala";
import { ISalaDTO } from "../dto/ISalaDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";


export class SalaMap extends Mapper<Sala> {

  public static toDTO( sala: Sala): ISalaDTO {
    return {
      nomeSala: sala.nomeSala.nome,
      categoriaSala: sala.categoriaSala.categoria,
      dimensaoSala: {
          x1: sala.dimensaoSala.props.x1,
          y1: sala.dimensaoSala.props.y1,
          x2: sala.dimensaoSala.props.x2,
          y2: sala.dimensaoSala.props.y2,
      },
      descricaoSala: sala.descricaoSala.descricao,
      piso: sala.piso.codigoPiso.toString()
    } as ISalaDTO;
  }

  public static toDomain (sala: any | Model<ISalaPersistence & Document> ): Sala {
    const salaOrError = Sala.create(
      sala,
      new UniqueEntityID(sala.domainId)
    );

    salaOrError.isFailure ? console.log(salaOrError.error) : '';

    return salaOrError.isSuccess ? salaOrError.getValue() : null;
  }

  public static toPersistence (sala: Sala): any {
    const a = {
        domainId: sala.id.toString(),
        nomeSala: sala.nomeSala.nome,
        categoriaSala: sala.categoriaSala.categoria,
        dimensaoSala:{
          x1: sala.dimensaoSala.props.x1,
          y1: sala.dimensaoSala.props.y1,
          x2: sala.dimensaoSala.props.x2,
          y2: sala.dimensaoSala.props.y2
        },
        descricaoSala: sala.descricaoSala.descricao,
        piso: sala.piso.codigoPiso.toString()
    }
    return a;
  }
}
