import { Service, Inject } from 'typedi';

import IElevadorRepo from '../services/IRepos/IElevadorRepo';
import { Elevador } from '../domain/elevador/elevador';
import { ElevadorMap } from '../mappers/ElevadorMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { IElevadorPersistence } from '../dataschema/IElevadorPersistence';

//TO_DO
@Service()
export default class ElevadorRepo implements IElevadorRepo {
    private models: any;

    constructor(
        @Inject('elevadorSchema') private elevadorSchema: Model<IElevadorPersistence & Document>,
    ) { }

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async save(elevador: Elevador): Promise<Elevador> {
        const query = { domainId: elevador.id.toString() };

        const elevadorDocument = await this.elevadorSchema.findOne(query);

        try {
            if (elevadorDocument === null) {
                const rawelevador: any = ElevadorMap.toPersistence(elevador);
                const elevadorCreated = await this.elevadorSchema.create(rawelevador);
                return ElevadorMap.toDomain(elevadorCreated);
            } else {
                elevadorDocument.edificio = elevador.edificio.codigoEdificio.toString();
                elevadorDocument.pisos = elevador.pisos.map(elevador => elevador.codigoPiso.toString());
                elevadorDocument.numeroSerie = elevador.numeroSerie.value;
                elevadorDocument.marca = elevador.marca.value;
                elevadorDocument.modelo = elevador.modelo.value;
                elevadorDocument.descricao = elevador.descricao.value;

                await elevadorDocument.save();
                return elevador;
            }
        } catch (err) {
            throw err;
        }
    }

    public async delete(numeroIdentificativo: string) {
        const query = { numeroIdentificativo: numeroIdentificativo };
        const resilt = await this.elevadorSchema.deleteOne(query as FilterQuery<IElevadorPersistence & Document>);
        return resilt.deletedCount;
    }

    public async findById(id: string): Promise<Elevador> {
        const query = { domainId: id };
        const elevadorRecord = await this.elevadorSchema.findOne(query as FilterQuery<IElevadorPersistence & Document>);
        if (elevadorRecord != null)
            return ElevadorMap.toDomain(elevadorRecord);
        else return null;
    }

    public async findByNumeroIdentificativo(numIdentificativo: string): Promise<Elevador> {
        const query = { numeroIdentificativo: numIdentificativo };
        const elevadorRecord = await this.elevadorSchema.findOne(query as FilterQuery<IElevadorPersistence & Document>);
        if (elevadorRecord != null)
            return ElevadorMap.toDomain(elevadorRecord);
        else return null;
    }


    public async getLastNumeroIdentificativoOfGivenEdificio(codigoEdificio: string): Promise<string> {
        const query = { edificio: codigoEdificio };
        const elevadorRecord = await this.elevadorSchema.findOne(query as FilterQuery<IElevadorPersistence & Document>).sort({ numeroSerie: -1 });
        if (elevadorRecord != null)
            return elevadorRecord.numeroIdentificativo;
        else return null;
    }


    public async findAll(): Promise<Elevador[]> {
        const elevadorList = await this.elevadorSchema.find();
        if (elevadorList != null) {
            return ElevadorMap.toDomainBulk(elevadorList);
        }
    }

    public async exists(t: Elevador): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public async findAllByEdificio(codigoEdificio: string): Promise<Elevador[]> {
        const query = { edificio: codigoEdificio };
        const elevadorList = await this.elevadorSchema.find(query as FilterQuery<IElevadorPersistence & Document>);
        if (elevadorList != null) {
            return ElevadorMap.toDomainBulk(elevadorList);
        }
    }
}

