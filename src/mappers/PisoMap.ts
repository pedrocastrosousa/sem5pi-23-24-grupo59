import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Piso } from '../domain/piso/piso';
import { Document, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';
import { IPisoDTO } from '../dto/IPisoDTO';


export class PisoMap extends Mapper<Piso> {

  public static toDTO( piso: Piso): IPisoDTO {
    return {
      nome: piso.nome.value,
      descricao: piso.descricao.value,
      edificio: piso.edificio,
    } as IPisoDTO;
  }

  public static toDomain (piso: any | Model<IPisoPersistence & Document>): Piso {
   
    const pisoOrError = Piso.create(
      piso
    , new UniqueEntityID(piso.domainId));

    pisoOrError.isFailure ? console.log(pisoOrError.error) : '';
    
    return pisoOrError.isSuccess ? pisoOrError.getValue() : null;
  }

  public static toPersistence (piso: Piso): any {
    const a = {
      nome: piso.nome.value,
      descricao: piso.descricao.value,
      edificio: piso.edificio,
    }
    return a;
  }
}