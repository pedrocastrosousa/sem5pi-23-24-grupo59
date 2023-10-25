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
const PisoMap_1 = require("../mappers/PisoMap");
const mongoose_1 = require("mongoose");
const typedi_1 = require("typedi");
const pisoId_1 = require("../domain/piso/pisoId");
let PisoRepo = class PisoRepo {
    constructor(pisoSchema) {
        this.pisoSchema = pisoSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async findByDomainId(pisoId) {
        const query = { domainId: pisoId };
        const pisoRecord = await this.pisoSchema.findOne(query);
        if (pisoRecord != null)
            return PisoMap_1.PisoMap.toDomain(pisoRecord);
        else
            return null;
    }
    async exists(piso) {
        const idX = piso.id instanceof pisoId_1.PisoId ? piso.id.toValue() : piso.id;
        const query = { domainId: idX };
        const pisoDocument = await this.pisoSchema.findOne(query);
        return !!pisoDocument === true;
    }
    async save(piso) {
        const query = { domainId: piso.id.toString() };
        console.log('');
        const pisoDocument = await this.pisoSchema.findOne(query);
        try {
            if (pisoDocument === null) {
                console.log('repo 49');
                const rawPiso = PisoMap_1.PisoMap.toPersistence(piso);
                const pisoCreated = await this.pisoSchema.create(rawPiso);
                console.log('repo 59');
                return PisoMap_1.PisoMap.toDomain(pisoCreated);
            }
            else {
                pisoDocument.nome = piso.nome.value;
                pisoDocument.descricao = piso.descricao.value;
                pisoDocument.edificio = piso.edificio;
                console.log('Document inserted successfully!');
                await pisoDocument.save();
                console.log('repo 59');
                return piso;
            }
        }
        catch (err) {
            throw err;
        }
    }
};
PisoRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('pisoSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PisoRepo);
exports.default = PisoRepo;
//# sourceMappingURL=pisoRepo.js.map