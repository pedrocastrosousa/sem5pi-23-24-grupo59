import { Service, Inject } from 'typedi';

import ISalaRepo from '../services/IRepos/ISalaRepo';
import { Sala } from '../domain/sala/sala';
import { SalaMap } from '../mappers/SalaMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { ISalaPersistence } from '../dataschema/ISalaPersistence';

@Service()
export default class SalaRepo implements ISalaRepo {
    private models: any;

    constructor(
        @Inject('salaSchema') private salaSchema: Model<ISalaPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async findById(id: string): Promise<Sala> {
        const query = { domainId: id };
        const salaRecord = await this.salaSchema.findOne( query as FilterQuery<ISalaPersistence & Document> );
        if( salaRecord != null)
          return SalaMap.toDomain(salaRecord);
        else return null;
    }
    public async exists(t: Sala): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public async save(sala: Sala): Promise<Sala> {
        console.log('LOG SALA SAVE REPO', sala);
        const query = { domainId: sala.id.toString() };

        const salaDocument = await this.salaSchema.findOne(query);

        try {
            if (salaDocument === null) {
                const rawSala: any = SalaMap.toPersistence(sala);
                const salaCreated = await this.salaSchema.create(rawSala);
                console.log('FOOOOODAS MAS ESTA MRD VEM PARA AQUI???', salaDocument);
                return SalaMap.toDomain(salaCreated);
            } else {
                salaDocument.categoriaSala = sala.categoriaSala.categoria;
                salaDocument.dimensaoSala.x1 = sala.dimensaoSala.props.x1;
                salaDocument.dimensaoSala.y1 = sala.dimensaoSala.props.y1;
                salaDocument.dimensaoSala.x2 = sala.dimensaoSala.props.x2;
                salaDocument.dimensaoSala.y2 = sala.dimensaoSala.props.y2;
                salaDocument.descricaoSala = sala.descricaoSala.descricao;
                console.log('Document inserted successfully!');
                await salaDocument.save();
                console.log('LOG SALA DOCUMENT', salaDocument);
                return sala;
            }
        } catch (err) {
            throw err;
        }
    }
}
