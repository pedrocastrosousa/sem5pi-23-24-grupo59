import { Document, Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { Passagem } from "../domain/passagem/passagem";
import { IPassagemDTO } from "../dto/IPassagemDTO";
import { CoordenadaPiso1 } from "../domain/passagem/coordenadaPiso1";
import { CoordenadaPiso2 } from "../domain/passagem/coordenadaPiso2";


export class PassagemMap extends Mapper<Passagem> {

    public static toDTO(passagem: Passagem): IPassagemDTO {
        return {
            coordenadaPiso1: {
                x: passagem.coordenadaPiso1.x,
                y: passagem.coordenadaPiso1.y,
                piso: passagem.coordenadaPiso1.piso,
            },
            coordenadaPiso2: {
                x: passagem.coordenadaPiso2.x,
                y: passagem.coordenadaPiso2.y,
                piso: passagem.coordenadaPiso2.piso,
            }
        }as unknown as IPassagemDTO ;
    }

    public static async toDomain(raw: any): Promise<Passagem> {


        const xPiso1OrError = raw.coordenadaPiso1.x;
        const yPiso1OrError = raw.coordenadaPiso1.y;
        const piso1OrError = raw.coordenadaPiso1.piso;

        const xPiso2OrError = raw.coordenadaPiso2.x;
        const yPiso2OrError = raw.coordenadaPiso2.y;
        const piso2OrError = raw.coordenadaPiso2.piso;

        const coordenadaPiso1OrError = CoordenadaPiso1.create(xPiso1OrError, yPiso1OrError, piso1OrError).getValue();
        const coordenadaPiso2OrError = CoordenadaPiso2.create(xPiso2OrError, yPiso2OrError, piso2OrError).getValue();

        const passagemOrError = Passagem.create({
            coordenadaPiso1: coordenadaPiso1OrError,
            coordenadaPiso2: coordenadaPiso2OrError
        },
            new UniqueEntityID(raw.domainId));

        passagemOrError.isFailure ? console.log(passagemOrError.error) : '';

        return passagemOrError.isSuccess ? passagemOrError.getValue() : null;
    }

    public static toPersistence(passagem: Passagem): any {
        const a = {
            domainId: passagem.id.toString(),
            coordenadaPiso1: passagem.coordenadaPiso1,
            coordenadaPiso2: passagem.coordenadaPiso2,
        }
        return a;
    }
}