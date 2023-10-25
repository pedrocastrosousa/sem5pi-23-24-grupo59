import { Document, Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { Passagem } from "../domain/passagem/passagem";
import { IPassagemDTO } from "../dto/IPassagemDTO";
import { IPassagemPersistence } from "../dataschema/IPassagemPersistence";


export class PassagemMap extends Mapper<Passagem> {

    public static toDTO(passagem: Passagem): IPassagemDTO {
        return {
            id: passagem.passagemId.toString(),
            coordenadasPiso1: {
                x: passagem.coordenadaPiso1.props.x,
                y: passagem.coordenadaPiso1.props.y,
                piso: passagem.coordenadaPiso1.props.piso,
            },
            coordenadasPiso2: {
                x: passagem.coordenadaPiso2.props.x,
                y: passagem.coordenadaPiso2.props.y,
                piso: passagem.coordenadaPiso2.props.piso,
            },
        } as unknown as IPassagemDTO;
    }

    public static toDomain(Passagem: any | Model<IPassagemPersistence & Document>): Passagem {
        const PassagemOrError = Passagem.create(
            Passagem ,
            new UniqueEntityID(Passagem
                .domainId)
        );

        PassagemOrError.isFailure ? console.log(PassagemOrError.error) : '';

        return PassagemOrError.isSuccess ? PassagemOrError.getValue() : null;
    }

    public static toPersistence(Passagem: Passagem): any {
        const a = {
            domainId: Passagem.id.toString(),
            coordenadasPiso1 : Passagem.coordenadaPiso1,
            coordenadasPiso2 : Passagem.coordenadaPiso2,
        }
        return a;
    }
}