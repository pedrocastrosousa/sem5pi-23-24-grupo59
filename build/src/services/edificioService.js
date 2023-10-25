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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
const edificio_1 = require("../domain/edificio/edificio");
const Result_1 = require("../core/logic/Result");
const EdificioMap_1 = require("../mappers/EdificioMap");
const descricaoEdificio_1 = require("../domain/edificio/descricaoEdificio");
const nomeEdificio_1 = require("../domain/edificio/nomeEdificio");
const dimensaoMaximaPisos_1 = require("../domain/edificio/dimensaoMaximaPisos");
const codigoEdificio_1 = require("../domain/edificio/codigoEdificio");
let EdificioService = class EdificioService {
    constructor(edificioRepo) {
        this.edificioRepo = edificioRepo;
    }
    async findAll() {
        try {
            const edificios = await this.edificioRepo.findAll();
            if (edificios === null) {
                return Result_1.Result.fail('Edificio not found');
            }
            else {
                let edificioDTOResult = [];
                for (let index = 0; index < edificios.length; index++) {
                    const edificioDTO = EdificioMap_1.EdificioMap.toDTO(edificios[index]);
                    edificioDTOResult.push(edificioDTO);
                }
                return Result_1.Result.ok(edificioDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getEdificio(codigoEdificio) {
        try {
            const edificio = await this.edificioRepo.findByDomainId(codigoEdificio);
            if (edificio === null) {
                return Result_1.Result.fail('Edificio not found');
            }
            else {
                const edificioDTOResult = EdificioMap_1.EdificioMap.toDTO(edificio);
                return Result_1.Result.ok(edificioDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createEdificio(edificioDTO) {
        try {
            const codigoEdificio = codigoEdificio_1.CodigoEdificio.create(edificioDTO.codigoEdificio).getValue();
            const descricaoEdificio = descricaoEdificio_1.DescricaoEdificio.create(edificioDTO.descricaoEdificio).getValue();
            const nomeEdificio = nomeEdificio_1.NomeEdificio.create(edificioDTO.nomeEdificio).getValue();
            const dimensaoMaximaPisos = dimensaoMaximaPisos_1.DimensaoMaximaPisos.create(edificioDTO.dimensaoMaximaPisos).getValue();
            const edificioOrError = edificio_1.Edificio.create({
                codigoEdificio: codigoEdificio,
                descricaoEdificio: descricaoEdificio,
                nomeEdificio: nomeEdificio,
                dimensaoMaximaPisos: dimensaoMaximaPisos,
            });
            if (edificioOrError.isFailure) {
                return Result_1.Result.fail(edificioOrError.errorValue());
            }
            const edificioResult = edificioOrError.getValue();
            await this.edificioRepo.save(edificioResult);
            console.log('service ed 76');
            const edificioDTOResult = EdificioMap_1.EdificioMap.toDTO(edificioResult);
            return Result_1.Result.ok(edificioDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateEdificio(edificioDTO) {
        try {
            const edificio = await this.edificioRepo.findByDomainId(edificioDTO.codigoEdificio);
            if (edificio === null) {
                return Result_1.Result.fail('Role not found');
            }
            else {
                edificio.descricaoEdificio = descricaoEdificio_1.DescricaoEdificio.create(edificioDTO.descricaoEdificio).getValue();
                edificio.nomeEdificio = nomeEdificio_1.NomeEdificio.create(edificioDTO.nomeEdificio).getValue();
                edificio.dimensaoMaximaPisos = dimensaoMaximaPisos_1.DimensaoMaximaPisos.create(edificioDTO.dimensaoMaximaPisos).getValue();
                await this.edificioRepo.save(edificio);
                const edificioDTOResult = EdificioMap_1.EdificioMap.toDTO(edificio);
                return Result_1.Result.ok(edificioDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
};
EdificioService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.edificio.name)),
    __metadata("design:paramtypes", [Object])
], EdificioService);
exports.default = EdificioService;
//# sourceMappingURL=edificioService.js.map