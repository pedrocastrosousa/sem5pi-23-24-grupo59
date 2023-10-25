"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PassagemMap = void 0;
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
const Mapper_1 = require("../core/infra/Mapper");
class PassagemMap extends Mapper_1.Mapper {
    static toDTO(passagem) {
        return {
            id: passagem.passagemId.toString(),
            coordenadasPiso1: {
                x: passagem.coordenadaPiso1.props.x,
                y: passagem.coordenadaPiso1.props.y,
                piso: passagem.coordenadaPiso1.props.piso,
            },
            coordenadasPiso2: {
                x: passagem.coordenadaPiso2.props.x,
                y: passagem.coordenadaPiso2.props.y,
                piso: passagem.coordenadaPiso2.props.piso,
            },
        };
    }
    static toDomain(Passagem) {
        const PassagemOrError = Passagem.create(Passagem, new UniqueEntityID_1.UniqueEntityID(Passagem
            .domainId));
        PassagemOrError.isFailure ? console.log(PassagemOrError.error) : '';
        return PassagemOrError.isSuccess ? PassagemOrError.getValue() : null;
    }
    static toPersistence(Passagem) {
        const a = {
            domainId: Passagem.id.toString(),
            coordenadasPiso1: Passagem.coordenadaPiso1,
            coordenadasPiso2: Passagem.coordenadaPiso2,
        };
        return a;
    }
}
exports.PassagemMap = PassagemMap;
//# sourceMappingURL=PassagemMap.js.map