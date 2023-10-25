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
const mongoose_1 = require("mongoose");
const typedi_1 = require("typedi");
const PassagemMap_1 = require("../mappers/PassagemMap");
let PassagemRepo = class PassagemRepo {
    constructor(PassagemSchema) {
        this.PassagemSchema = PassagemSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async findById(id) {
        const query = { domainId: id };
        const PassagemRecord = await this.PassagemSchema.findOne(query);
        if (PassagemRecord != null)
            return PassagemMap_1.PassagemMap.toDomain(PassagemRecord);
        else
            return null;
    }
    async exists(t) {
        throw new Error('Method not implemented.');
    }
    async save(Passagem) {
        const query = { domainId: Passagem.id.toString() };
        const PassagemDocument = await this.PassagemSchema.findOne(query);
        try {
            if (PassagemDocument === null) {
                const rawPassagem = PassagemMap_1.PassagemMap.toPersistence(Passagem);
                const PassagemCreated = await this.PassagemSchema.create(rawPassagem);
                return PassagemMap_1.PassagemMap.toDomain(PassagemCreated);
            }
            else {
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
        }
        catch (err) {
            throw err;
        }
    }
};
PassagemRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('PassagemSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], PassagemRepo);
exports.default = PassagemRepo;
//# sourceMappingURL=passagemRepo.js.map