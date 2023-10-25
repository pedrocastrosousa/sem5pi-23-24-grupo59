"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
require("reflect-metadata");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/edificios', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.edificio.name);
    route.post('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            codigoEdificio: celebrate_1.Joi.string().required(),
            descricaoEdificio: celebrate_1.Joi.string().required(),
            nomeEdificio: celebrate_1.Joi.string().optional(),
            dimensaoMaximaPisos: celebrate_1.Joi.object().required(),
        }),
    }), (req, res, next) => ctrl.createEdificio(req, res, next));
    route.put('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            name: celebrate_1.Joi.string().required(),
        }),
    }), (req, res, next) => ctrl.updateEdificio(req, res, next));
};
//# sourceMappingURL=edificioRoute.js.map