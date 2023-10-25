import { Document, FilterQuery, Model } from "mongoose";
import { Inject, Service } from "typedi";
import { Passagem } from "../domain/passagem/passagem";
import { PassagemMap } from "../mappers/PassagemMap";
import { IPassagemPersistence } from "../dataschema/IPassagemPersistence";

@Service()
export default class PassagemRepo implements IPassagemRepo {
    private models: any;

    constructor(
        @Inject('PassagemSchema') private PassagemSchema: Model<IPassagemPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async findById(id: string): Promise<Passagem> {
        const query = { domainId: id };
        const PassagemRecord = await this.PassagemSchema.findOne( query as FilterQuery<IPassagemPersistence & Document> );
        if( PassagemRecord != null)
          return PassagemMap.toDomain(PassagemRecord);
        else return null;
    }
    public async exists(t: Passagem): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public async save(Passagem: Passagem): Promise<Passagem> {

        const query = { domainId: Passagem.id.toString() };

        const PassagemDocument = await this.PassagemSchema.findOne(query);

        try {
            if (PassagemDocument === null) {
                const rawPassagem: any = PassagemMap.toPersistence(Passagem);
                const PassagemCreated = await this.PassagemSchema.create(rawPassagem);
                return PassagemMap.toDomain(PassagemCreated);
            } else {
                PassagemDocument.coordenadaspiso1.x = Passagem.coordenadaPiso1.props.x;
                PassagemDocument.coordenadaspiso1.y = Passagem.coordenadaPiso1.props.y;
                PassagemDocument.coordenadaspiso1.piso = Passagem.coordenadaPiso1.props.piso.pisoId.toString();
  
                PassagemDocument.coordenadaspiso2.x = Passagem.coordenadaPiso2.props.x;
                PassagemDocument.coordenadaspiso2.y = Passagem.coordenadaPiso2.props.y;
                PassagemDocument.coordenadaspiso2.piso = Passagem.coordenadaPiso2.props.piso.pisoId.toString();
  
                console.log('Document inserted successfully!');
                await PassagemDocument.save();

                return Passagem;
            }
        } catch (err) {
            throw err;
        }
    }
}
