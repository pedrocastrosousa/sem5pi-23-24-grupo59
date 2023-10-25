"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const mongoose_1 = __importDefault(require("./mongoose"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../../config"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await (0, mongoose_1.default)();
    logger_1.default.info('✌️ DB loaded and connected!');
    const userSchema = {
        // compare with the approach followed in repos and services
        name: 'userSchema',
        schema: '../persistence/schemas/userSchema',
    };
    const roleSchema = {
        // compare with the approach followed in repos and services
        name: 'roleSchema',
        schema: '../persistence/schemas/roleSchema',
    };
    const edificioSchema = {
        // compare with the approach followed in repos and services
        name: 'edificioSchema',
        schema: '../persistence/schemas/edificioSchema',
    };
    const pisoSchema = {
        // compare with the approach followed in repos and services
        name: 'pisoSchema',
        schema: '../persistence/schemas/pisoSchema',
    };
    const roleController = {
        name: config_1.default.controllers.role.name,
        path: config_1.default.controllers.role.path
    };
    const roleRepo = {
        name: config_1.default.repos.role.name,
        path: config_1.default.repos.role.path
    };
    const userRepo = {
        name: config_1.default.repos.user.name,
        path: config_1.default.repos.user.path
    };
    const roleService = {
        name: config_1.default.services.role.name,
        path: config_1.default.services.role.path
    };
    const edificioController = {
        name: config_1.default.controllers.edificio.name,
        path: config_1.default.controllers.edificio.path
    };
    const edificioService = {
        name: config_1.default.services.edificio.name,
        path: config_1.default.services.edificio.path
    };
    const edificioRepo = {
        name: config_1.default.repos.edificio.name,
        path: config_1.default.repos.edificio.path
    };
    const pisoController = {
        name: config_1.default.controllers.piso.name,
        path: config_1.default.controllers.piso.path
    };
    const pisoRepo = {
        name: config_1.default.repos.piso.name,
        path: config_1.default.repos.piso.path
    };
    const pisoService = {
        name: config_1.default.services.piso.name,
        path: config_1.default.services.piso.path
    };
    await (0, dependencyInjector_1.default)({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            edificioSchema,
            pisoSchema
        ],
        controllers: [
            roleController,
            edificioController,
            pisoController
        ],
        repos: [
            roleRepo,
            userRepo,
            edificioRepo,
            pisoRepo
        ],
        services: [
            roleService,
            edificioService,
            pisoService
        ]
    });
    logger_1.default.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
    await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map