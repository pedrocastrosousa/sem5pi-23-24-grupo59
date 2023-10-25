"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Passagem = void 0;
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const Guard_1 = require("../../core/logic/Guard");
const Result_1 = require("../../core/logic/Result");
const passagemId_1 = require("./passagemId");
class Passagem extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get passagemId() {
        return new passagemId_1.PassagemId(this.passagemId.toValue());
    }
    get coordenadaPiso1() {
        return this.props.coordenadaPiso1;
    }
    get coordenadaPiso2() {
        return this.props.coordenadaPiso2;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.coordenadaPiso1, argumentName: 'coordenadaPiso1' },
            { argument: props.coordenadaPiso2, argumentName: 'coordenadaPiso2' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            const passagem = new Passagem(Object.assign({}, props), id);
            return Result_1.Result.ok(passagem);
        }
    }
}
exports.Passagem = Passagem;
//# sourceMappingURL=passagem.js.map