import { Document, FilterQuery, Model } from "mongoose";
import { Inject, Service } from "typedi";
import { Passagem } from "../domain/passagem/passagem";
import { PassagemMap } from "../mappers/PassagemMap";
import { IPassagemPersistence } from "../dataschema/IPassagemPersistence";
import { PassagemId } from "../domain/passagem/passagemId";
import IPassagemRepo from "../services/IRepos/IPassagemRepo";
import e from "express";
import { IPisoPersistence } from "../dataschema/IPisoPersistence";

@Service()
export default class PassagemRepo implements IPassagemRepo {
    private models: any;

    constructor(
        @Inject('passagemSchema') private passagemSchema: Model<IPassagemPersistence & Document>,
        @Inject('pisoSchema') private pisoSchema: Model<IPisoPersistence & Document>,

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
                passagemDocument.piso1 = passagem.piso1.codigoPiso.toString();
                passagemDocument.piso2 = passagem.piso2.codigoPiso.toString();
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
        if (passagemRecord != null)
            return PassagemMap.toDomain(passagemRecord);
        else return null;
    }

    public async findAllByEdificio(edificio1: string, edificio2: string): Promise<string[]> {
        try {
            const passagens = await this.passagemSchema.find({
                $or: [
                    {
                        $and: [
                            { piso1: { $regex: edificio1, $options: 'i' } }, // Correspondência parcial do edifício1 em piso1
                            { piso2: { $regex: edificio2, $options: 'i' } }, // Correspondência parcial do edifício2 em piso2
                        ]
                    },
                    {
                        $and: [
                            { piso1: { $regex: edificio2, $options: 'i' } }, // Correspondência parcial do edifício2 em piso1
                            { piso2: { $regex: edificio1, $options: 'i' } }, // Correspondência parcial do edifício1 em piso2
                        ]
                    },
                ],
            }).exec();
    
            if (passagens.length > 0) {
                const passagemIds = passagens.map((passagem) => passagem.codigoPassagem);
                return passagemIds;
            }
    
            return [];
        } catch (error) {
            console.error(error);
            return [];
        }

    }
   
}
