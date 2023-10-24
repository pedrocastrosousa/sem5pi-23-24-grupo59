
import IPisoRepo from "../services/IRepos/IPisoRepo";

import { PisoMap } from "../mappers/PisoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPisoPersistence } from '../dataschema/IPisoPersistence';
import { Piso } from '../domain/piso/piso';
import { Inject, Service } from "typedi";
import { PisoNome } from "../domain/piso/pisoNome";
import { PisoId } from "../domain/piso/pisoId";


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

  public async findByDomainId(pisoId: PisoId| string): Promise<Piso> {
    const query = { domainId:  pisoId };
    const pisoRecord = await this.pisoSchema.findOne(query as FilterQuery<IPisoPersistence & Document>);
    if (pisoRecord != null)
      return PisoMap.toDomain(pisoRecord);
    else return null;
  }

  public async exists(piso: Piso): Promise<boolean> {
    const idX = piso.id instanceof PisoId ? (<PisoId>piso.id).toValue(): piso.id;

    const query = { domainId: idX}; 
    const pisoDocument = await this.pisoSchema.findOne( query  as FilterQuery<IPisoPersistence & Document>);

    return !!pisoDocument === true;
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

        pisoDocument.nome = piso.nome.value;
        pisoDocument.descricao = piso.descricao.value;
        pisoDocument.edificio = piso.edificio.codigoEdificio.toString();
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