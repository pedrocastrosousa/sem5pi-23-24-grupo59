import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

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
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const edificioController = {
    name: config.controllers.edificio.name,
    path: config.controllers.edificio.path
  }

  const edificioService = {
    name: config.services.edificio.name,
    path: config.services.edificio.path
  }

  const edificioRepo = {
    name: config.repos.edificio.name,
    path: config.repos.edificio.path
  }
  const pisoController = {
    name: config.controllers.piso.name,
    path: config.controllers.piso.path
  }

  const pisoRepo = {
    name: config.repos.piso.name,
    path: config.repos.piso.path
  }
  const pisoService = {
    name: config.services.piso.name,
    path: config.services.piso.path
  }


  await dependencyInjectorLoader({
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
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
