"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const edificio_1 = require("../domain/edificio/edificio");
const mongoose_1 = require("mongoose");
const EdificioMap_1 = require("../mappers/EdificioMap");
let EdificioRepo = class EdificioRepo {
    constructor(edificioSchema) {
        this.edificioSchema = edificioSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(edificio) {
        const idX = edificio instanceof edificio_1.Edificio ? edificio : edificio;
        const query = { domainId: idX };
        const roleDocument = await this.edificioSchema.findOne(query);
        console.log(roleDocument);
        return !!roleDocument === true;
    }
    async save(edificio) {
        const query = { domainId: edificio.id.toString() };
        const edificioDocument = await this.edificioSchema.findOne(query);
        try {
            if (edificioDocument === null) {
                const rawEdificio = EdificioMap_1.EdificioMap.toPersistence(edificio);
                const edificioCreated = await this.edificioSchema.create(rawEdificio);
                console.log('repo 42');
                return EdificioMap_1.EdificioMap.toDomain(edificioCreated);
            }
            else {
                edificioDocument.codigoEdificio = edificio.codigoEdificio.value;
                edificioDocument.descricaoEdificio = edificio.descricaoEdificio.descricao;
                edificioDocument.nomeEdificio = edificio.nomeEdificio.nome;
                edificioDocument.dimensaoMaximaPisos = edificio.dimensaoMaximaPisos;
                await edificioDocument.save();
                return edificio;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(id) {
        const query = { domainId: id };
        const edificioRecord = await this.edificioSchema.findOne(query);
        console.log('eed repo 62');
        console.log(edificioRecord);
        if (edificioRecord != null) {
            return EdificioMap_1.EdificioMap.toDomain(edificioRecord);
        }
        else
            return null;
    }
    async findByDomain(codigoEdificio) {
        const query = { domainId: codigoEdificio };
        const edificioRecord = await this.edificioSchema.findOne(query);
        console.log(edificioRecord);
        if (edificioRecord != null) {
            return EdificioMap_1.EdificioMap.toDomain(edificioRecord);
        }
        else
            return null;
    }
    async findAll() {
        try {
            const edificioRecords = await this.edificioSchema.find({});
            const edificios = edificioRecords.map(record => EdificioMap_1.EdificioMap.toDomain(record));
            return edificios;
        }
        catch (error) {
            throw new Error(`Erro ao obter edificios`);
        }
    }
};
EdificioRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('edificioSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], EdificioRepo);
exports.default = EdificioRepo;
//# sourceMappingURL=edificioRepo.js.map