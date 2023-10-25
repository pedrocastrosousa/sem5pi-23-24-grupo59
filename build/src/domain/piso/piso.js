"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Piso = void 0;
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const Guard_1 = require("../../core/logic/Guard");
const Result_1 = require("../../core/logic/Result");
const pisoId_1 = require("./pisoId");
class Piso extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get pisoId() {
        return new pisoId_1.PisoId(this.pisoId.toValue());
    }
    get nome() {
        return this.props.nome;
    }
    get descricao() {
        return this.props.descricao;
    }
    get edificio() {
        return this.props.edificio;
    }
    set nome(value) {
        this.props.nome = value;
    }
    set descricao(value) {
        this.props.descricao = value;
    }
    set edificio(value) {
        this.props.edificio = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.nome, argumentName: 'nome' },
            { argument: props.descricao, argumentName: 'descricao' },
            { argument: props.edificio, argumentName: 'edificio' }
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            const piso = new Piso(Object.assign({}, props), id);
            return Result_1.Result.ok(piso);
        }
    }
}
exports.Piso = Piso;
//# sourceMappingURL=piso.js.map