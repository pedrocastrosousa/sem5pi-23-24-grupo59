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
import e from 'express';

export class EdificioMap extends Mapper<Edificio> {
  public static toDTO(edificio: Edificio): IEdificioDTO {
    return {
      codigoEdificio: edificio.codigoEdificio.value,
      descricaoEdificio: edificio.descricaoEdificio.descricao,
      nomeEdificio: edificio.nomeEdificio.nome,
      dimensaoMaximaPisos: {
        largura: edificio.dimensaoMaximaPisos.props.largura,
        comprimento: edificio.dimensaoMaximaPisos.props.comprimento,
      } 
    }as IEdificioDTO;
  }


  public static async toDomain(raw: any): Promise<Edificio> {
    
    const codigoOrError = CodigoEdificio.create(raw.codigoEdificio).getValue();
    const descricaoOrError = DescricaoEdificio.create(raw.descricaoEdificio).getValue();
    const nomeOrError = NomeEdificio.create(raw.nomeEdificio).getValue();
    const comprimento = raw.dimensaoMaximaPisos.comprimento;
    const largura = raw.dimensaoMaximaPisos.largura;
    const dimensoesOrError = DimensaoMaximaPisos.create1(largura, comprimento).getValue();


    const edificioOrError = Edificio.create({
      codigoEdificio: codigoOrError, 
      descricaoEdificio: descricaoOrError,
      nomeEdificio: nomeOrError,
      dimensaoMaximaPisos: dimensoesOrError,
    }
      , new UniqueEntityID(raw.domainId));

    edificioOrError.isFailure ? console.log(edificioOrError.error) : "";
    return edificioOrError.isSuccess ? edificioOrError.getValue() : null;

  }


  public static toPersistence(edificio: Edificio): any {
    return {
      domainId: edificio.id.toString(),
      codigoEdificio: edificio.codigoEdificio.value,
      descricaoEdificio: edificio.descricaoEdificio.descricao,
      nomeEdificio: edificio.nomeEdificio.nome,
      dimensaoMaximaPisos: edificio.dimensaoMaximaPisos
    };
  }
}
