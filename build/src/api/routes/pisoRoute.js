"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/pisos', route);
    console.log('piso route');
    const ctrl = typedi_1.Container.get(config_1.default.controllers.piso.name);
    route.post('/criarPiso', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            nome: celebrate_1.Joi.string().required(),
            descricao: celebrate_1.Joi.string().required(),
            edificio: celebrate_1.Joi.string().required()
        })
    }), async (req, res, next) => ctrl.createPiso(req, res, next));
    route.put('/editarPiso', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            nome: celebrate_1.Joi.string().required(),
            descricao: celebrate_1.Joi.string().required(),
            edificio: celebrate_1.Joi.string().required()
        }),
    }), (req, res, next) => ctrl.updatePiso(req, res, next));
};
//# sourceMappingURL=pisoRoute.js.map