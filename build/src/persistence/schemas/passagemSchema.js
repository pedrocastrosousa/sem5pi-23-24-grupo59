"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const PassagemSchema = new mongoose_1.default.Schema({
    domainId: {
        type: String,
        unique: true
    },
    coordenadasPiso1: {
        x: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: 'X must be an integer',
            },
        },
        y: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: 'Y must be an integer',
            },
        },
        piso: {
            type: String,
            required: true,
        }
    },
    coordenadasPiso2: {
        x: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: 'X must be an integer',
            },
        },
        y: {
            type: Number,
            required: true,
            validate: {
                validator: Number.isInteger,
                message: 'Y must be an integer',
            },
        },
        piso: {
            type: String,
            required: true,
        }
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model('Passagem', PassagemSchema);
//# sourceMappingURL=passagemSchema.js.map