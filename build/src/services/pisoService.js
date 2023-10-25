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
const piso_1 = require("../domain/piso/piso");
const pisoNome_1 = require("../domain/piso/pisoNome");
const pisoDescricao_1 = require("../domain/piso/pisoDescricao");
const Result_1 = require("../core/logic/Result");
const PisoMap_1 = require("../mappers/PisoMap");
let PisoService = class PisoService {
    constructor(pisoRepo, edificioRepo) {
        this.pisoRepo = pisoRepo;
        this.edificioRepo = edificioRepo;
    }
    async createPiso(pisoDTO) {
        /*
        const edificioOrError = await this.getEdificio(pisoDTO.edificio);
              if (edificioOrError.isFailure) {
                return Result.fail<{pisoDTO: IPisoDTO; token: string}>(edificioOrError.error);
              } else {
                edificio = edificioOrError.getValue();
              }
        */
        try {
            const nome = await pisoNome_1.PisoNome.create(pisoDTO.nome).getValue();
            const descricao = await pisoDescricao_1.PisoDescricao.create(pisoDTO.descricao).getValue();
            let edificioo;
            console.log(edificioo);
            const edificioOrError = await this.getEdificio(pisoDTO.edificio);
            console.log(edificioOrError);
            console.log('servicopiso 41');
            if (edificioOrError.isFailure) {
                console.log('servico55');
                return Result_1.Result.fail(edificioOrError.error);
            }
            else {
                edificioo = edificioOrError.getValue();
            }
            const pisoOrError = await piso_1.Piso.create({
                nome: nome,
                descricao: descricao,
                edificio: edificioo,
            });
            if (pisoOrError.isFailure) {
                return Result_1.Result.fail(pisoOrError.errorValue());
            }
            const pisoResult = pisoOrError.getValue();
            await this.pisoRepo.save(pisoResult);
            const pisoDTOResult = PisoMap_1.PisoMap.toDTO(pisoResult);
            return Result_1.Result.ok(pisoDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updatePiso(pisoDTO) {
        try {
            const piso = await this.pisoRepo.findByDomainId(pisoDTO.id);
            if (piso === null) {
                return Result_1.Result.fail("Piso not found");
            }
            else {
                console.log('linha 63');
                piso.nome = pisoNome_1.PisoNome.create(pisoDTO.nome).getValue();
                piso.descricao = pisoDescricao_1.PisoDescricao.create(pisoDTO.descricao).getValue();
                await this.pisoRepo.save(piso);
                console.log('piso service 68');
                const pisoDTOResult = PisoMap_1.PisoMap.toDTO(piso);
                console.log('piso service 71');
                return Result_1.Result.ok(pisoDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getEdificio(edificio) {
        console.log(edificio);
        const edificioExists = await this.edificioRepo.findByDomainId(edificio);
        if (edificioExists) {
            return Result_1.Result.ok(edificioExists);
        }
        else {
            return Result_1.Result.fail("Couldn't find edificio by id=" + edificio);
        }
    }
};
PisoService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.piso.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.edificio.name)),
    __metadata("design:paramtypes", [Object, Object])
], PisoService);
exports.default = PisoService;
//# sourceMappingURL=pisoService.js.map