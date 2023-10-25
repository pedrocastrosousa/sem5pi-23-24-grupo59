"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PisoMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const piso_1 = require("../domain/piso/piso");
const edificioRepo_1 = __importDefault(require("../repos/edificioRepo"));
const typedi_1 = require("typedi");
const pisoNome_1 = require("../domain/piso/pisoNome");
const pisoDescricao_1 = require("../domain/piso/pisoDescricao");
class PisoMap extends Mapper_1.Mapper {
    static toDTO(piso) {
        return {
            nome: piso.nome.value,
            descricao: piso.descricao.value,
            edificio: piso.edificio.id.toValue()
        };
    }
    static async toDomain(piso) {
        const pisoNomeOrError = pisoNome_1.PisoNome.create(piso.pisoNome);
        const pisoDescricaoOrError = pisoDescricao_1.PisoDescricao.create(piso.pisoDescricao);
        const repo = typedi_1.Container.get(edificioRepo_1.default);
        const edificio = await repo.findByDomain(piso.edificio);
        const pisoOrError = piso_1.Piso.create({
            nome: pisoNomeOrError.getValue(),
            descricao: pisoDescricaoOrError.getValue(),
            edificio: edificio,
        }, new UniqueEntityID_1.UniqueEntityID(piso.domainId));
        pisoOrError.isFailure ? console.log(pisoOrError.error) : '';
        return pisoOrError.isSuccess ? pisoOrError.getValue() : null;
    }
    static toPersistence(piso) {
        const a = {
            nome: piso.nome.value,
            descricao: piso.descricao.value,
            edificio: piso.edificio,
        };
        return a;
    }
}
exports.PisoMap = PisoMap;
//# sourceMappingURL=PisoMap.js.map