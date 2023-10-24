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


export class PisoMap extends Mapper<Piso> {

  public static toDTO( piso: Piso): IPisoDTO {
    return {
      nome: piso.nome.value,
      descricao: piso.descricao.value,
      edificio: piso.edificio.codigoEdificio.toString()
    } as IPisoDTO;
  }

  public static async toDomain (piso: any | Model<IPisoPersistence & Document>): Promise<Piso> {
    const pisoNomeOrError = PisoNome.create(piso.pisoNome);
    const pisoDescricaoOrError = PisoDescricao.create(piso.pisoDescricao);
    const repo = Container.get(EdificioRepo);
    const edificio = await repo.findByDomainId(piso.edificio);

    const pisoOrError = Piso.create({
      nome: pisoNomeOrError.getValue(), 
      descricao: pisoDescricaoOrError.getValue(),
      edificio: edificio,
    }
    , new UniqueEntityID(piso.domainId))

    pisoOrError.isFailure ? console.log(pisoOrError.error) : '';
    
    return pisoOrError.isSuccess ? pisoOrError.getValue() : null;
  }

  public static toPersistence (piso: Piso): any {
    const a = {
      nome: piso.nome.value,
      descricao: piso.descricao.value,
      edificio: piso.edificio.codigoEdificio.toValue(),
    }
    return a;
  }
}