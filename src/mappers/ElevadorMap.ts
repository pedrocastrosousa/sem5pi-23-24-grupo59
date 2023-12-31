import { Elevador } from "../domain/elevador/elevador";
import { Mapper } from "../core/infra/Mapper";
import { IElevadorDTO } from "../dto/IElevadorDTO";
import { Container } from 'typedi';
import EdificioRepo from "../repos/edificioRepo";
import PisosRepo from "../repos/pisoRepo";
import { NumeroSerieElevador } from "../domain/elevador/numeroSerieElevador";
import { MarcaElevador } from "../domain/elevador/marcaElevador";
import { DescricaoElevador } from "../domain/elevador/descricaoElevador";
import { ModeloElevador } from "../domain/elevador/modeloElevador";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class ElevadorMap extends Mapper<Elevador> {

  public static toDTO(elevador: Elevador): IElevadorDTO {
    return {
      id: elevador.id.toString(),
      numeroIdentificativo: elevador.numeroIdentificativo.toString(),
      edificio: elevador.edificio.codigoEdificio.toString(),
      pisos: elevador.pisos.map(piso => piso.codigoPiso.toString()),
      numeroSerie: elevador.numeroSerie.value,
      marca: elevador.marca.value,
      modelo: elevador.modelo.value,
      descricao: elevador.descricao.value
    } as IElevadorDTO;
  }

  public static async toDomain(raw: any): Promise<Elevador> {
    const repoEdificio = Container.get(EdificioRepo);
    const repoPiso = Container.get(PisosRepo);
    const edificioOrError = await repoEdificio.findByCodigo(raw.edificio);
    if (!edificioOrError) {
      throw new Error("Edifício " + raw.edificio.codigoEdificio + " do elevador: " + raw.numeroSerieElevador + "não encontrado");
    }
    const pisosOrError = [];

    for (const pisoId of raw.pisos) {
      const piso = await repoPiso.findByCodigo(pisoId);
      if (piso) {
        pisosOrError.push(piso);
      } else {
        throw new Error(`Piso: ${pisoId} do elevador: ${raw.numeroSerieElevador} não encontrado.`);
      }
    }
    const numeroSerieOrError = raw.numeroSerie ? NumeroSerieElevador.create(raw.numeroSerie).getValue() : undefined;
    const marcaOrError = raw.marca ? MarcaElevador.create(raw.marca).getValue() : undefined;
    const modeloOrError = raw.modelo ? ModeloElevador.create(raw.modelo).getValue() : undefined;
    const descricaoOrError = raw.descricao ? DescricaoElevador.create(raw.descricao).getValue() : undefined;
    const elevadorOrError = Elevador.create({
      edificio: edificioOrError,
      pisos: pisosOrError,
      numeroIdentificativo: raw.numeroIdentificativo,
      numeroSerie: numeroSerieOrError,
      marca: marcaOrError,
      modelo: modeloOrError,
      descricao: descricaoOrError,
    }
      , new UniqueEntityID(raw.domainId));

    elevadorOrError.isFailure ? console.log(elevadorOrError.error) : "";
    return elevadorOrError.isSuccess ? elevadorOrError.getValue() : null;
  }

  public static toPersistence(elevador: Elevador): any {
    const a = {
      domainId: elevador.id.toString(),
      numeroIdentificativo: elevador.numeroIdentificativo.toString(),
      edificio: elevador.edificio.codigoEdificio.toString(),
      pisos: elevador.pisos.map(piso => piso.codigoPiso.toString()),
      numeroSerie: elevador.numeroSerie.value,
      marca: elevador.marca.value,
      modelo: elevador.modelo.value,
      descricao: elevador.descricao.value
    }
    return a;
  }


  public static async toDomainBulk(rawList: any[]): Promise<Elevador[]> {
    const elevadores: Elevador[] = [];

    for (const raw of rawList) {
      const elevador = await this.toDomain(raw);
      if (elevador) {
        elevadores.push(elevador);
      }
    }

    return elevadores;
  }
}

