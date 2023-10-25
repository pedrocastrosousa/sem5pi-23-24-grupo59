import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Piso } from '../domain/piso/piso';
import { Document, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';
import { IPisoDTO } from '../dto/IPisoDTO';
import EdificioRepo from "../repos/edificioRepo";
import { Container } from 'typedi';
import { PisoNome } from "../domain/piso/pisoNome";
import { PisoDescricao } from "../domain/piso/pisoDescricao";
import e from "express";


export class PisoMap extends Mapper<Piso> {

  public static toDTO(piso: Piso): IPisoDTO {
    return {
      id: piso.id.toString(),
      nome: piso.nome.value,
      descricao: piso.descricao.value,
      edificio: piso.edificio.id.toString()
    }

  }

  public static async toDomain(piso: any | Model<IPisoPersistence & Document>): Promise<Piso> {
    const pisoNomeOrError = PisoNome.create(piso.pisoNome);
    const pisoDescricaoOrError = PisoDescricao.create(piso.pisoDescricao);
    const repo = Container.get(EdificioRepo);
    const edificioo = await repo.findByDomainId(piso.edificio);
    

    const pisoOrError = Piso.create({
      nome: pisoNomeOrError.getValue(),
      descricao: pisoDescricaoOrError.getValue(),
      edificio: edificioo,
    }
      , new UniqueEntityID(piso.domainId))

    pisoOrError.isFailure ? console.log(pisoOrError.error) : '';

    return pisoOrError.isSuccess ? pisoOrError.getValue() : null;
  }

  public static toPersistence(piso: Piso): any {
    const a = {
      nome: piso.nome.value,
      descricao: piso.descricao.value,
      edificio: piso.edificio.id.toString()
    }
    return a;
  }
}