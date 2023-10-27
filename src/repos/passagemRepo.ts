import { Document, FilterQuery, Model } from "mongoose";
import { Inject, Service } from "typedi";
import { Passagem } from "../domain/passagem/passagem";
import { PassagemMap } from "../mappers/PassagemMap";
import { IPassagemPersistence } from "../dataschema/IPassagemPersistence";
import { PassagemId } from "../domain/passagem/passagemId";
import IPassagemRepo from "../services/IRepos/IPassagemRepo";
import e from "express";

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

    public async findByDomainId(passagemId: PassagemId | string): Promise<Passagem> {
        const query = { domainId: passagemId };
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
                const passagemCreated = await this.passagemSchema.create(rawPassagem);
                return PassagemMap.toDomain(passagemCreated);
            } else {
                passagemDocument.piso1 = passagem.piso1.id.toString();
                passagemDocument.piso2 = passagem.piso2.id.toString();
                passagemDocument.codigoPassagem = passagem.codigoPassagem;

                console.log('Document inserted successfully!');
                await passagemDocument.save();

                return passagem;
            }
        } catch (err) {
            throw err;
        }
    }
    public async findAll(): Promise<Passagem[]> {
        const passagemList = await this.passagemSchema.find();

        if (passagemList != null) {
            return PassagemMap.toDomainBulk(passagemList);
        }
    }


    public async findByCodigo(codigo: string): Promise<Passagem> {
        const query = { codigoPassagem: codigo };
        const passagemRecord = await this.passagemSchema.findOne(query as FilterQuery<IPassagemPersistence & Document>);
        if (passagemRecord != null)
            return PassagemMap.toDomain(passagemRecord);
        else return null;
    }


    public async findById(id: string): Promise<Passagem> {
        const query = { _id: id };
        const passagemRecord = await this.passagemSchema.findOne(query as FilterQuery<IPassagemPersistence & Document>);
        if (passagemRecord  != null)
            return PassagemMap.toDomain(passagemRecord);
        else return null;
    }

    public async findAllByEdificio(edificio1: string, edificio2: string): Promise<string[]> {
        const passagens = await this.passagemSchema.find({
            $and: [
              {
                $and: [
                  { 'passagem.piso1.edificio.codigo': edificio1 },
                  { 'passagem.piso2.edificio.codigo': edificio2 },
                ],
              },
                {
                    $and: [
                    { 'passagem.piso1.edificio.codigo': edificio2 },
                    { 'passagem.piso2.edificio.codigo': edificio1 },
                    ],
                },
             
            ],
          }).exec();
          if (passagens.length > 0) {
            const passagemIds = passagens.map((passagem) => passagem._id.toString());

            return passagemIds;
          } else {
            return [];
          }
    }
}



