"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("../../config"));
const typedi_1 = require("typedi");
let PisoController = class PisoController {
    constructor(pisoServiceInstance) {
        this.pisoServiceInstance = pisoServiceInstance;
    }
    async createPiso(req, res, next) {
        console.log('controler 22');
        try {
            const pisoOrError = await this.pisoServiceInstance.createPiso(req.body);
            if (pisoOrError.isFailure) {
                return res.status(402).send();
            }
            const pisoDTO = pisoOrError.getValue();
            return res.json(pisoDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async updatePiso(req, res, next) {
        try {
            const pisoOrError = await this.pisoServiceInstance.updatePiso(req.body);
            console.log('controler 37');
            if (pisoOrError.isFailure) {
                return res.status(404).send();
            }
            const pisoDTO = pisoOrError.getValue();
            return res.status(201).json(pisoDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
};
PisoController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.piso.name)),
    __metadata("design:paramtypes", [Object])
], PisoController);
exports.default = PisoController;
;
//# sourceMappingURL=pisoController.js.map