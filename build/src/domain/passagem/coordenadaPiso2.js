"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoordenadaPiso2 = void 0;
const AggregateRoot_1 = require("../../core/domain/AggregateRoot");
const Result_1 = require("../../core/logic/Result");
class CoordenadaPiso2 extends AggregateRoot_1.AggregateRoot {
    get piso() {
        return this.props.piso;
    }
    static create(x, y, piso) {
        return Result_1.Result.ok(new CoordenadaPiso2({ x, y, piso }));
    }
}
exports.CoordenadaPiso2 = CoordenadaPiso2;
//# sourceMappingURL=coordenadaPiso2.js.map