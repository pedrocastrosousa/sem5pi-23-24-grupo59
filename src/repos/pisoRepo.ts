
import IPisoRepo from "../services/IRepos/IPisoRepo";

import { PisoMap } from "../mappers/PisoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';
import { Piso } from '../domain/piso/piso';
import { Inject, Service } from "typedi";
import { PisoNome } from "../domain/piso/pisoNome";


@Service()
export default class PisoRepo implements IPisoRepo {
  private models: any;

  constructor(
    @Inject('pisoSchema') private pisoSchema: Model<IPisoPersistence & Document>,
  ) { }

  private createBaseQuery(): any {
    return {
      where: {},
    }
  }

  public async findById(pisoNome: PisoNome| string): Promise<Piso> {
    const query = { pisoNome: pisoNome };
    const pisoRecord = await this.pisoSchema.findOne(query as FilterQuery<IPisoPersistence & Document>);
    if (pisoRecord != null)
      return PisoMap.toDomain(pisoRecord);
    else return null;
  }

  public async exists(t: Piso): Promise<boolean> {
    throw new Error('Method not implemented.');
  }

  public async save(piso: Piso): Promise<Piso> {

    const query = { domainId: piso.id.toString() };

    console.log('');

    const pisoDocument = await this.pisoSchema.findOne(query);

    try {
      if (pisoDocument === null) {
        console.log('repo 49');

        const rawPiso: any = PisoMap.toPersistence(piso);
                      

        const pisoCreated = await this.pisoSchema.create(rawPiso);

        return PisoMap.toDomain(pisoCreated);

      } else {

        //pisoDocument.nome = piso.nome.value;

       // pisoDocument.descricao = piso.descricao.value;
        pisoDocument.edificio = piso.edificio;
        console.log('Document inserted successfully!');

        await pisoDocument.save();
        console.log('repo 59');

        return piso;
      }
    } catch (err) {
      throw err;
    }
  }

}