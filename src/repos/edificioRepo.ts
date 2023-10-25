import { Service, Inject } from 'typedi';

import { Edificio } from "../domain/edificio/edificio";
import { CodigoEdificio } from "../domain/edificio/codigoEdificio";

import { Document, FilterQuery, Model } from 'mongoose';
import { IEdificioPersistence } from '../dataschema/IEdificioPersistence';
import IEdificioRepo from '../services/IRepos/IEdificioRepo';
import { EdificioMap } from '../mappers/EdificioMap';


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
    const idX = edificio.id instanceof CodigoEdificio ? (<CodigoEdificio>edificio.id).toValue() : edificio.id;

    const query = { domainId: idX };
    const roleDocument = await this.edificioSchema.findOne(query as FilterQuery<IEdificioPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save(edificio: Edificio): Promise<Edificio> {
    const query = { domainId: edificio.id.toString() };

    const edificioDocument = await this.edificioSchema.findOne(query);

    try {
      if (edificioDocument === null) {
        const rawEdificio: any = EdificioMap.toPersistence(edificio);

        const edificioCreated = await this.edificioSchema.create(rawEdificio);

        return EdificioMap.toDomain(edificioCreated);
      } else {
        edificioDocument.descricaoEdificio = edificio.descricaoEdificio.descricao;
        edificioDocument.nomeEdificio = edificio.nomeEdificio.nome;
        edificioDocument.dimensaoMaximaPisos = edificio.dimensaoMaximaPisos;
        await edificioDocument.save();

        return edificio;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(codigoEdificio: CodigoEdificio | string): Promise<Edificio> {
    const query = { domainId: codigoEdificio };
    const edificioRecord = await this.edificioSchema.findOne(query as FilterQuery<IEdificioPersistence & Document>);
    if (edificioRecord != null) {
      return EdificioMap.toDomain(edificioRecord);
    } else return null;
  }

  public async findByDomain(codigoEdificio: Edificio | string): Promise<Edificio> {
    const query = { domainId: codigoEdificio };
    const edificioRecord = await this.edificioSchema.findOne(query as FilterQuery<IEdificioPersistence & Document>);
       console.log(edificioRecord);

       if (edificioRecord != null) {
        return EdificioMap.toDomainMariana(edificioRecord);
      } else return null;
}

  

  public async findAll(): Promise<Edificio[]> {
    try {
      const edificioRecords = await this.edificioSchema.find({});

      const edificios = edificioRecords.map(record => EdificioMap.toDomain(record));

      return edificios;
    } catch (error) {
      throw new Error(`Erro ao obter edificios`);
    }
  }
}