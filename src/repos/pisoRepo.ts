
import IPisoRepo from "../services/IRepos/IPisoRepo";

import { PisoMap } from "../mappers/PisoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';
import { Piso } from '../domain/piso/piso';
import { Inject, Service } from "typedi";



@Service()
export default class PisoRepo implements IPisoRepo {
  private models: any;

  constructor(
    @Inject('pisoSchema') private pisoSchema: Model<IPisoPersistence & Document>,
  ) { }
  exists(t: Piso): Promise<boolean> {
    throw new Error("Method not implemented.");
  }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async findByDomainId(id: string): Promise<Piso> {
    const query = { domainId: id };
    const pisoRecord = await this.pisoSchema.findOne(query as FilterQuery<IPisoPersistence & Document>);
    if (pisoRecord != null)
      return PisoMap.toDomain(pisoRecord);
    else return null;
  }


  public async findByCodigo(codigo: string): Promise<Piso> {
    const query = { codigoPiso: codigo };
    
    const pisoRecord = await this.pisoSchema.findOne(query as FilterQuery<IPisoPersistence & Document>);
    if (pisoRecord != null)
        return PisoMap.toDomain(pisoRecord);
    else return null;
}

  public async findByNomePiso(nome: Piso['nome']): Promise<Piso> {
    const query = { nome: nome.toString() };
    const pisoRecord = await this.pisoSchema.find(query as FilterQuery<IPisoPersistence & Document>);

    if (pisoRecord != null) {
      return PisoMap.toDomain(pisoRecord);
    }
    else
      return null;
  }

/*
  public async exists(piso: Piso): Promise<boolean> {
    const idX = piso.nome instanceof PisoNome ? (<PisoNome>piso.nome).value : piso.nome;

    const query = { pisoNome: idX };
    const pisoDocument = await this.pisoSchema.findOne(query as FilterQuery<IPisoPersistence & Document>);

    return !!pisoDocument === true;
  }
*/



  public async save(piso: Piso): Promise<Piso> {

    const query = { domainId: piso.id.toString() };

    const pisoDocument = await this.pisoSchema.findOne(query);

    try {
      if (pisoDocument === null) {

        const rawPiso: any = PisoMap.toPersistence(piso);

        const pisoCreated = await this.pisoSchema.create(rawPiso);

        return PisoMap.toDomain(pisoCreated);

      } else {

        pisoDocument.nome = piso.nome;
        pisoDocument.descricao = piso.descricao.value;
        pisoDocument.edificio = piso.edificio.codigoEdificio.value;
        pisoDocument.codigoPiso = piso.codigoPiso;

        await pisoDocument.save();

        return piso;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findEdificiosByPisoCountRange(minCount: number, maxCount: number): Promise<string[]> {
    const pipeline = [
        {
            $group: {
                _id: '$edificio',
                count: { $sum: 1 }
            }
        },
        {
            $match: {
                count: { $gte: minCount, $lte: maxCount }
            }
        }
    ];

    const result = await this.pisoSchema.aggregate(pipeline);

    if (result.length > 0) {
        const edificios = result.map((item) => item._id.toString());
        return edificios;
    } else {
        return null;
    }
}

}