import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ISalaPersistence } from "../dataschema/ISalaPersistence";
import { Sala } from "../domain/sala/sala";
import { ISalaDTO } from "../dto/ISalaDTO";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { NomeSala } from "../domain/sala/nomeSala";
import { CategoriaSala } from "../domain/sala/categoriaSala";
import { DimensaoSala } from "../domain/sala/dimensaoSala";
import { DescricaoSala } from "../domain/sala/descricaoSala";
import { Piso } from "../domain/piso/piso";
import Container from "typedi";
import PisoRepo from "../repos/pisoRepo";


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

  public static async toDomain (sala: any | Model<ISalaPersistence & Document> ): Promise<Sala> {
   const nomeSalaOrError = NomeSala.create(sala.nomeSala);
   const categoriaSalaOrError = CategoriaSala.create(sala.categoriaSala);
   const dimensaoSalaOrError = DimensaoSala.create(sala.dimensaoSala.x1, sala.dimensaoSala.y1, sala.dimensaoSala.x2, sala.dimensaoSala.y2);
  const descricaoSalaOrError = DescricaoSala.create(sala.descricaoSala);
  const repo = Container.get(PisoRepo);
const pisoOrError =  await repo.findByCodigo(sala.piso);
    const salaOrError = Sala.create(
      {
        nomeSala: nomeSalaOrError.getValue(),
        categoriaSala: categoriaSalaOrError.getValue(),
        dimensaoSala: dimensaoSalaOrError.getValue(),
        descricaoSala: descricaoSalaOrError.getValue(),
        piso: pisoOrError
      },
    
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


  public static async toDomainBulk(rawList: any[]): Promise<Sala[]> {
    const salas: Sala[] = [];

    for (const raw of rawList) {
      const sala = await this.toDomain(raw);
      if (sala) {
        salas.push(sala);
      }
    }

    return salas;
  }
}
