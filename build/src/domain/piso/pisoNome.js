"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PisoNome = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
class PisoNome extends ValueObject_1.ValueObject {
    get value() {
        return this.props.value;
    }
    constructor(props) {
        super(props);
    }
    static create(pisoNome) {
        return Result_1.Result.ok(new PisoNome({ value: pisoNome }));
    }
}
exports.PisoNome = PisoNome;
//# sourceMappingURL=pisoNome.js.map