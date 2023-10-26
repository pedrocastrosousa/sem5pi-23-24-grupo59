import { Document, Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { Passagem } from "../domain/passagem/passagem";
import { IPassagemDTO } from "../dto/IPassagemDTO";
import { CoordenadaPiso1 } from "../domain/passagem/coordenadaPiso1";
import { CoordenadaPiso2 } from "../domain/passagem/coordenadaPiso2";
import Container from "typedi";
import PisoRepo from "../repos/pisoRepo";


export class PassagemMap extends Mapper<Passagem> {

    public static toDTO(passagem: Passagem): IPassagemDTO {
        return {       
                piso1: passagem.piso1.id.toString(),
                piso2: passagem.piso2.id.toString(),
            }as unknown as IPassagemDTO ;

        }
    

    public static async toDomain(raw: any): Promise<Passagem> {

        const repo = Container.get(PisoRepo);
        const pisoo1 = await repo.findByDomainId(raw.piso1);
        const repo1 = Container.get(PisoRepo);
        const pisoo2 = await repo1.findByDomainId(raw.piso2);
        

        const passagemOrError = Passagem.create({
        piso1: pisoo1,
        piso2: pisoo2
        },
            new UniqueEntityID(raw.domainId));

        passagemOrError.isFailure ? console.log(passagemOrError.error) : '';

        return passagemOrError.isSuccess ? passagemOrError.getValue() : null;
    }

    public static toPersistence(passagem: Passagem): any {
        const a = {
            domainId: passagem.id.toString(),
            piso1: passagem.piso1.id.toString(),
            piso2: passagem.piso2.id.toString()
        }
        return a;
    }
}