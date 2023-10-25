"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PisoDescricao = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
class PisoDescricao extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(pisoDescricao) {
        return Result_1.Result.ok(new PisoDescricao({ value: pisoDescricao }));
    }
}
exports.PisoDescricao = PisoDescricao;
//# sourceMappingURL=pisoDescricao.js.map