"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DescricaoEdificio = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class DescricaoEdificio extends ValueObject_1.ValueObject {
    get descricao() {
        return this.props.descricao;
    }
    constructor(props) {
        super(props);
    }
    static create(descricao) {
        const guardResult = Guard_1.Guard.againstNullOrUndefined(descricao, 'descricao');
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            return Result_1.Result.ok(new DescricaoEdificio({ descricao: descricao }));
        }
    }
}
exports.DescricaoEdificio = DescricaoEdificio;
//# sourceMappingURL=descricaoEdificio.js.map