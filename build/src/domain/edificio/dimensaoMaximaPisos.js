"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DimensaoMaximaPisos = void 0;
const ValueObject_1 = require("../../core/domain/ValueObject");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class DimensaoMaximaPisos extends ValueObject_1.ValueObject {
    get comprimento() {
        return this.props.comprimento;
    }
    get largura() {
        return this.props.largura;
    }
    constructor(props) {
        super(props);
    }
    static create(props) {
        const guardedProps = [
            { argument: props.comprimento, argumentName: 'comprimento' },
            { argument: props.largura, argumentName: 'largura' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefined(guardedProps, 'dimensaoMaximaPisos');
        if (!guardResult.succeeded || props.comprimento < 0 || props.largura < 0) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            return Result_1.Result.ok(new DimensaoMaximaPisos(Object.assign({}, props)));
        }
    }
    static create1(largura, comprimento) {
        if (comprimento <= 0 || largura <= 0) {
            return Result_1.Result.fail("As dimensões do piso devem ser superiores a 0.");
        }
        return Result_1.Result.ok(new DimensaoMaximaPisos({ largura, comprimento }));
    }
}
exports.DimensaoMaximaPisos = DimensaoMaximaPisos;
//# sourceMappingURL=dimensaoMaximaPisos.js.map