"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordenadaPiso1 = void 0;
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const Result_1 = require("../../core/logic/Result");
class CoordenadaPiso1 extends AggregateRoot_1.AggregateRoot {
    get piso() {
        return this.props.piso;
    }
    static create(x, y, piso) {
        return Result_1.Result.ok(new CoordenadaPiso1({ x, y, piso }));
    }
}
exports.CoordenadaPiso1 = CoordenadaPiso1;
//# sourceMappingURL=coordenadaPiso1.js.map