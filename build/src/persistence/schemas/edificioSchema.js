"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EdificioSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    codigoEdificio: {
        type: String,
        unique: true
    },
    descricaoEdificio: {
        type: String,
        index: true,
    },
    nomeEdificio: {
        type: String,
        optional: true,
        index: true,
    },
    dimensaoMaximaPisos: {
        type: Object,
        index: true,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Edificio', EdificioSchema);
//# sourceMappingURL=edificioSchema.js.map