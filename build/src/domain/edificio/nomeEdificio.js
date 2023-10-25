"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NomeEdificio = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
class NomeEdificio extends ValueObject_1.ValueObject {
    get nome() {
        return this.props.nome;
    }
    constructor(props) {
        super(props);
    }
    static create(nomeEdificio) {
        if (!nomeEdificio) {
            return Result_1.Result.ok(null);
        }
        if (nomeEdificio.length > 50) {
            return Result_1.Result.fail('Excedeu o limite do tamanho do nome de edificio!');
        }
        else {
            return Result_1.Result.ok(new NomeEdificio({ nome: nomeEdificio }));
        }
    }
}
exports.NomeEdificio = NomeEdificio;
//# sourceMappingURL=nomeEdificio.js.map