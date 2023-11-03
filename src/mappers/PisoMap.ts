import { Mapper } from "../core/infra/Mapper";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Piso } from '../domain/piso/piso';
import { IPisoDTO } from '../dto/IPisoDTO';
import EdificioRepo from "../repos/edificioRepo";
import { Container } from 'typedi';
import { PisoDescricao } from "../domain/piso/pisoDescricao";


export class PisoMap extends Mapper<Piso> {

  public static toDTO(piso: Piso): IPisoDTO {
    return {
      id: piso.id.toString(),
      nome: piso.nome,
      descricao: piso.descricao.value,
      edificio: piso.edificio.codigoEdificio.toString(),
      codigoPiso: piso.codigoPiso,
      mapa: piso.mapa
    } as IPisoDTO;

  }

  public static async toDomain(piso: any): Promise<Piso> {

    const pisoDescricaoOrError = PisoDescricao.create(piso.descricao);
    // const pisoMapaOrError = PisoMapa.create(piso.mapa);

    const repo = Container.get(EdificioRepo);
    const edificio = await repo.findByCodigo(piso.edificio);
    const pisoOrError = Piso.create({
      nome: piso.nome,
      descricao: pisoDescricaoOrError.getValue(),
      edificio: edificio,
      codigoPiso: piso.codigoPiso,
      mapa: piso.mapa
    }
      , new UniqueEntityID(piso.domainId))

    pisoOrError.isFailure ? console.log(pisoOrError.error) : '';

    return pisoOrError.isSuccess ? pisoOrError.getValue() : null;
  }

  public static async toDomainBulk(rawList: any[]): Promise<Piso[]> {
    const pisos: Piso[] = [];

    for (const raw of rawList) {
      const piso = await this.toDomain(raw);
      if (piso) {
        pisos.push(piso);
      }
    }

    return pisos;
  }


  public static toPersistence(piso: Piso): any {
    const a = {
      domainId: piso.id.toString(),
      nome: piso.nome,
      descricao: piso.descricao.value,
      edificio: piso.edificio.codigoEdificio,
      codigoPiso: piso.codigoPiso,
      mapa: piso.mapa
    }
    return a;
  }
}