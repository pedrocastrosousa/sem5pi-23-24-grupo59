import { Document, Model } from "mongoose";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Mapper } from "../core/infra/Mapper";
import { Passagem } from "../domain/passagem/passagem";
import { IPassagemDTO } from "../dto/IPassagemDTO";
import Container from "typedi";
import PisoRepo from "../repos/pisoRepo";


export class PassagemMap extends Mapper<Passagem> {

    public static toDTO(passagem: Passagem): IPassagemDTO {
        return {       
id: passagem.id.toString(),
                piso1: passagem.piso1.codigoPiso,
                piso2: passagem.piso2.codigoPiso,
                codigoPassagem: passagem.codigoPassagem
            }as unknown as IPassagemDTO ;

        }
    

    public static async toDomain(raw: any): Promise<Passagem> {

        const repo = Container.get(PisoRepo);
        const pisoo1 = await repo.findByCodigo(raw.piso1);
        const repo1 = Container.get(PisoRepo);
        const pisoo2 = await repo1.findByCodigo(raw.piso2);
        

        const passagemOrError = Passagem.create({
        piso1: pisoo1,
        piso2: pisoo2,
        codigoPassagem: raw.codigoPassagem
        },
            new UniqueEntityID(raw.domainId));

        passagemOrError.isFailure ? console.log(passagemOrError.error) : '';

        return passagemOrError.isSuccess ? passagemOrError.getValue() : null;
    }

    public static toPersistence(passagem: Passagem): any {
        const a = {
            domainId: passagem.id.toString(),
            piso1: passagem.piso1.codigoPiso,
            piso2: passagem.piso2.codigoPiso,
            codigoPassagem: passagem.codigoPassagem
        }
        return a;
    }

    public static async toDomainBulk(rawList: any[]): Promise<Passagem[]> {
        const passagens: Passagem[] = [];
    
        for (const raw of rawList) {
          const passagem = await this.toDomain(raw);
          if (passagem) {
            passagens.push(passagem);
          }
        }
    
        return passagens;
      }

}