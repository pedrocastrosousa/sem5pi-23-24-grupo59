"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Edificio = void 0;
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const Result_1 = require("../../core/logic/Result");
const Guard_1 = require("../../core/logic/Guard");
class Edificio extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get codigoEdificio() {
        return this.props.codigoEdificio;
    }
    get descricaoEdificio() {
        return this.props.descricaoEdificio;
    }
    set descricaoEdificio(descricao) {
        this.props.descricaoEdificio = descricao;
    }
    get nomeEdificio() {
        return this.props.nomeEdificio;
    }
    set nomeEdificio(nome) {
        this.props.nomeEdificio = nome;
    }
    get dimensaoMaximaPisos() {
        return this.props.dimensaoMaximaPisos;
    }
    set dimensaoMaximaPisos(dimensao) {
        this.props.dimensaoMaximaPisos = dimensao;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(props, id) {
        const guardedProps = [
            { argument: props.descricaoEdificio, argumentName: 'codigoEdificio' },
            { argument: props.descricaoEdificio, argumentName: 'descricaoEdificio' },
            { argument: props.nomeEdificio, argumentName: 'nomeEdificio' },
            { argument: props.dimensaoMaximaPisos, argumentName: 'dimensaoMaximaPisos' },
        ];
        const guardResult = Guard_1.Guard.againstNullOrUndefinedBulk(guardedProps);
        if (!guardResult.succeeded) {
            return Result_1.Result.fail(guardResult.message);
        }
        else {
            return Result_1.Result.ok(new Edificio(Object.assign({}, props), id));
        }
    }
}
exports.Edificio = Edificio;
//# sourceMappingURL=edificio.js.map