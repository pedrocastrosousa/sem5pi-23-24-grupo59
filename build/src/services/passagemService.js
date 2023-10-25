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
const Result_1 = require("../core/logic/Result");
const passagem_1 = require("../domain/passagem/passagem");
const coordenadaPiso1_1 = require("../domain/passagem/coordenadaPiso1");
const coordenadaPiso2_1 = require("../domain/passagem/coordenadaPiso2");
const PassagemMap_1 = require("../mappers/PassagemMap");
let PassagemService = class PassagemService {
    constructor(passagemRepo, pisoRepo) {
        this.passagemRepo = passagemRepo;
        this.pisoRepo = pisoRepo;
    }
    async createPassagem(passagemDTO) {
        try {
            let piso1;
            const piso1OrError = await this.getPiso(passagemDTO.coordenadasPiso1.piso);
            if (piso1OrError.isFailure) {
                return Result_1.Result.fail(piso1OrError.errorValue());
            }
            else {
                piso1 = piso1OrError.getValue();
            }
            let piso2;
            const piso2OrError = await this.getPiso(passagemDTO.coordenadasPiso2.piso);
            if (piso2OrError.isFailure) {
                return Result_1.Result.fail(piso1OrError.errorValue());
            }
            else {
                piso2 = piso2OrError.getValue();
            }
            const coordenadaPiso1 = await coordenadaPiso1_1.CoordenadaPiso1.create(passagemDTO.coordenadasPiso1.x, passagemDTO.coordenadasPiso1.y, piso1).getValue();
            const coordenadaPiso2 = await coordenadaPiso2_1.CoordenadaPiso2.create(passagemDTO.coordenadasPiso2.x, passagemDTO.coordenadasPiso2.y, piso2).getValue();
            const PassagemOrError = await passagem_1.Passagem.create({
                id: passagemDTO.id.toString(),
                coordenadaPiso1: coordenadaPiso1,
                coordenadaPiso2: coordenadaPiso2,
            });
            if (PassagemOrError.isFailure) {
                return Result_1.Result.fail(PassagemOrError.errorValue());
            }
            const PassagemResult = PassagemOrError.getValue();
            await this.passagemRepo.save(PassagemResult);
            const PassagemDTOResult = PassagemMap_1.PassagemMap.toDTO(PassagemResult);
            return Result_1.Result.ok(PassagemDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async getPiso(pisoId) {
        const piso = await this.pisoRepo.findByDomainId(pisoId);
        const found = !!piso;
        if (found) {
            return Result_1.Result.ok(piso);
        }
        else {
            return Result_1.Result.fail("Couldn't find piso by id=" + pisoId);
        }
    }
};
PassagemService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.passagem.name)),
    __param(1, (0, typedi_1.Inject)(config_1.default.repos.piso.name)),
    __metadata("design:paramtypes", [Object, Object])
], PassagemService);
exports.default = PassagemService;
//# sourceMappingURL=passagemService.js.map