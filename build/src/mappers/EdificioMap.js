"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EdificioMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const edificio_1 = require("../domain/edificio/edificio");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const descricaoEdificio_1 = require("../domain/edificio/descricaoEdificio");
const nomeEdificio_1 = require("../domain/edificio/nomeEdificio");
const dimensaoMaximaPisos_1 = require("../domain/edificio/dimensaoMaximaPisos");
const codigoEdificio_1 = require("../domain/edificio/codigoEdificio");
class EdificioMap extends Mapper_1.Mapper {
    static toDTO(edificio) {
        return {
            codigoEdificio: edificio.codigoEdificio.value,
            descricaoEdificio: edificio.descricaoEdificio.descricao,
            nomeEdificio: edificio.nomeEdificio.nome,
            dimensaoMaximaPisos: {
                largura: edificio.dimensaoMaximaPisos.largura,
                comprimento: edificio.dimensaoMaximaPisos.comprimento,
            },
        };
    }
    static toDomainMariana(edificio) {
        const codigoEdificio = codigoEdificio_1.CodigoEdificio.create(edificio.codigoEdificio);
        const descricaoEdificio = descricaoEdificio_1.DescricaoEdificio.create(edificio.descricaoEdificio.descricao);
        const nomeEdificio = nomeEdificio_1.NomeEdificio.create(edificio.nomeEdificio.nome);
        const dimensaoMaximaPisos = dimensaoMaximaPisos_1.DimensaoMaximaPisos.create(edificio.dimensaoMaximaPisos);
        const edificioOrError = edificio_1.Edificio.create({
            codigoEdificio: codigoEdificio.getValue(),
            descricaoEdificio: descricaoEdificio.getValue(),
            nomeEdificio: nomeEdificio.getValue(),
            dimensaoMaximaPisos: dimensaoMaximaPisos.getValue(),
        }, new UniqueEntityID_1.UniqueEntityID(edificio.id));
        edificioOrError.isFailure ? console.log(edificioOrError.error) : '';
        return edificioOrError.isSuccess ? edificioOrError.getValue() : null;
    }
    static async toDomain(raw) {
        console.log('map 52');
        const codigoOrError = codigoEdificio_1.CodigoEdificio.create(raw.codigoEdificio).getValue();
        console.log('map ed 58');
        const descricaoOrError = descricaoEdificio_1.DescricaoEdificio.create(raw.descricaoEdificio).getValue();
        const nomeOrError = nomeEdificio_1.NomeEdificio.create(raw.nomeEdificio).getValue();
        const comprimento = raw.dimensaoMaximaPisos.comprimento;
        const largura = raw.dimensaoMaximaPisos.largura;
        const dimensoesOrError = dimensaoMaximaPisos_1.DimensaoMaximaPisos.create1(largura, comprimento).getValue();
        const edificioOrError = edificio_1.Edificio.create({
            codigoEdificio: codigoOrError,
            descricaoEdificio: descricaoOrError,
            nomeEdificio: nomeOrError,
            dimensaoMaximaPisos: dimensoesOrError,
        }, new UniqueEntityID_1.UniqueEntityID(raw.domainId));
        edificioOrError.isFailure ? console.log(edificioOrError.error) : "";
        return edificioOrError.isSuccess ? edificioOrError.getValue() : null;
    }
    static toPersistence(edificio) {
        return {
            domainId: edificio.id.toString(),
            codigoEdificio: edificio.codigoEdificio.value,
            descricaoEdificio: edificio.descricaoEdificio.descricao,
            nomeEdificio: edificio.nomeEdificio.nome,
            dimensaoMaximaPisos: edificio.dimensaoMaximaPisos
        };
    }
}
exports.EdificioMap = EdificioMap;
//# sourceMappingURL=EdificioMap.js.map