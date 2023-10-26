import { Document, FilterQuery, Model } from "mongoose";
import { Inject, Service } from "typedi";
import { Passagem } from "../domain/passagem/passagem";
import { PassagemMap } from "../mappers/PassagemMap";
import { IPassagemPersistence } from "../dataschema/IPassagemPersistence";
import { PassagemId } from "../domain/passagem/passagemId";
import IPassagemRepo from "../services/IRepos/IPassagemRepo";

@Service()
export default class PassagemRepo implements IPassagemRepo {
    private models: any;

    constructor(
        @Inject('passagemSchema') private passagemSchema: Model<IPassagemPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async findByDomainId(passagemId: PassagemId| string): Promise<Passagem> {
        const query = { domainId:  passagemId };
        const passagemRecord = await this.passagemSchema.findOne(query as FilterQuery<IPassagemPersistence & Document>);
        if (passagemRecord != null)
          return PassagemMap.toDomain(passagemRecord);
        else return null;
      }

    public async exists(t: Passagem): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public async save(passagem: Passagem): Promise<Passagem> {

        const query = { domainId: passagem.id.toString() };

        const passagemDocument = await this.passagemSchema.findOne(query);

        try {
            if (passagemDocument === null) {
                const rawPassagem: any = PassagemMap.toPersistence(passagem);
                const passagemCreated = await this.PassagemSchema.create(rawPassagem);
                return PassagemMap.toDomain(passagemCreated);
            } else {
                passagemDocument.coordenadaspiso1 = passagem.coordenadaPiso1;
              
                passagemDocument.coordenadaspiso2 = passagem.coordenadaPiso2;
             
                console.log('Document inserted successfully!');
                await passagemDocument.save();

                return passagem;
            }
        } catch (err) {
            throw err;
        }
    }
}
