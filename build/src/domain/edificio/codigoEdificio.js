"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodigoEdificio = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
class CodigoEdificio extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(codigoEdificio) {
        if (!codigoEdificio) {
            return Result_1.Result.fail("O código do edifício é obrigatório.");
        }
        codigoEdificio = codigoEdificio.trim(); // Remover espaços em branco extra
        if (codigoEdificio.length > 5) {
            return Result_1.Result.fail("O código do edifício não pode conter mais do que 5 caracteres.");
        }
        if (!/^[a-zA-Z0-9 ]+$/.test(codigoEdificio)) {
            return Result_1.Result.fail("O código do edifício deve conter apenas letras, dígitos e espaços.");
        }
        return Result_1.Result.ok(new CodigoEdificio({ value: codigoEdificio }));
    }
}
exports.CodigoEdificio = CodigoEdificio;
//# sourceMappingURL=codigoEdificio.js.map