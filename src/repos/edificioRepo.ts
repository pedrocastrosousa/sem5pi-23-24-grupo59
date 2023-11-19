import { Service, Inject } from 'typedi';

import { Edificio } from '../domain/edificio/edificio';

import { Document, FilterQuery, Model } from 'mongoose';
import { IEdificioPersistence } from '../dataschema/IEdificioPersistence';
import IEdificioRepo from '../services/IRepos/IEdificioRepo';
import { EdificioMap } from '../mappers/EdificioMap';
import { NomeEdificio } from '../domain/edificio/nomeEdificio';

@Service()
export default class EdificioRepo implements IEdificioRepo {
  private models: any;

  constructor(@Inject('edificioSchema') private edificioSchema: Model<IEdificioPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(edificio: Edificio): Promise<boolean> {
    const idX = edificio.codigoEdificio;

    const query = { codigoEdificio: idX };
    const roleDocument = await this.edificioSchema.findOne(query as FilterQuery<IEdificioPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save(edificio: Edificio): Promise<Edificio> {
    const query = { codigoEdificio: edificio.codigoEdificio.toString() };
    const edificioDocument = await this.edificioSchema.findOne(query);
    try {
      if (edificioDocument === null) {
        const rawEdificio: any = EdificioMap.toPersistence(edificio);

        const edificioCreated = await this.edificioSchema.create(rawEdificio);
        return EdificioMap.toDomain(edificioCreated);
      } else {
        const nomeEdificio = edificio.nomeEdificio ? edificio.nomeEdificio.nome : null;
        edificioDocument.descricaoEdificio = edificio.descricaoEdificio.descricao;
        edificioDocument.nomeEdificio = nomeEdificio;
        edificioDocument.dimensaoMaximaPisos = {
          comprimento: edificio.dimensaoMaximaPisos.props.comprimento,
          largura: edificio.dimensaoMaximaPisos.props.largura,
        };
        await edificioDocument.save();
        edificio.nomeEdificio = NomeEdificio.create(nomeEdificio).getValue();
        return edificio;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByCodigo(codigoEdificio: string): Promise<Edificio> {
    const query = { codigoEdificio: codigoEdificio };
    const edificioRecord = await this.edificioSchema.findOne(query as FilterQuery<IEdificioPersistence & Document>);
    if (edificioRecord != null) return EdificioMap.toDomain(edificioRecord);
    else return null;
  }

  public async findAll(): Promise<Edificio[]> {
    const edificioRecord = await this.edificioSchema.find();

    if (edificioRecord != null) {
      const edificioPromises = edificioRecord.map(async postRecord => {
        return await EdificioMap.toDomain(postRecord);
      });
      const edificios = await Promise.all(edificioPromises);
      return edificios;
    } else {
      return null;
    }
  }

  public async delete(codigoEdificio: string) {
    const query = { codigoEdificio: codigoEdificio };
    await this.edificioSchema.deleteOne(query as FilterQuery<IEdificioPersistence & Document>);
  }
}
