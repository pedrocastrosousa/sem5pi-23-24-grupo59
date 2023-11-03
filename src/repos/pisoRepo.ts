
import IPisoRepo from "../services/IRepos/IPisoRepo";

import { PisoMap } from "../mappers/PisoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';
import { Piso } from '../domain/piso/piso';
import { Inject, Service } from "typedi";
import { IPassagemPersistence } from "../dataschema/IPassagemPersistence";



@Service()
export default class PisoRepo implements IPisoRepo {
  private models: any;

  constructor(
    @Inject('pisoSchema') private pisoSchema: Model<IPisoPersistence & Document>,
    @Inject('passagemSchema') private passagemSchema: Model<IPassagemPersistence & Document>,

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
        pisoDocument.edificio = piso.edificio.codigoEdificio.toString();
        pisoDocument.codigoPiso = piso.codigoPiso;
       // pisoDocument.mapa = piso.mapa.value.mapa.toString();

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

  public async findPisosComPassagensPorEdificio(edificio: string): Promise<string[]> {
    console.log(edificio);
    try {
      const pisosComPassagens = await this.pisoSchema.find({ edificio });

      const pisoIds = pisosComPassagens.map((piso) => piso.codigoPiso);

      const passagens = await this.passagemSchema.find({
        $or: [
          { piso1: { $in: pisoIds } },
          { piso2: { $in: pisoIds } },
        ],
      }).exec();

      if (passagens.length > 0) {
        const pisoIdsComPassagens = new Set(
          passagens.flatMap((passagem) => [passagem.piso1, passagem.piso2])
        );
        const pisoComPassagens = pisosComPassagens.filter((piso) =>
          pisoIdsComPassagens.has(piso.codigoPiso)
        );

        const codigoPisos = pisoComPassagens.map((piso) => piso.codigoPiso);
        return codigoPisos;
      }

      return [];
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  public async findAll(): Promise<Piso[]> {
    const pisoList = await this.pisoSchema.find();

    if (pisoList != null) {
        return PisoMap.toDomainBulk(pisoList);
    }
}


async update(filter: FilterQuery<Piso>, piso: Partial<Piso>) {

  await this.pisoSchema.updateOne(filter, {$set: piso});
}
}