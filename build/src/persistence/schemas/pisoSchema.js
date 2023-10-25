"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PisoSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    nome: {
        type: String,
        required: true
    },
    descricao: {
        type: String,
        required: true
    },
    edificio: {
        type: String,
        required: true,
        index: true,
    },
}, {
    timestamps: true
});
exports.default = mongoose_1.default.model('Piso', PisoSchema);
//# sourceMappingURL=pisoSchema.js.map