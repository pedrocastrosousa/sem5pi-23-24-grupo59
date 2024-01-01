import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';
import e from 'express';

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

  const salaSchema = {
    // compare with the approach followed in repos and services
    name: 'salaSchema',
    schema: '../persistence/schemas/salaSchema',
  };

   const tipoRobotSchema = {
    // compare with the approach followed in repos and services
    name: 'tipoRobotSchema',
    schema: '../persistence/schemas/tipoRobotSchema',
  };

  const passagemSchema = {
    // compare with the approach followed in repos and services
    name: 'passagemSchema',
    schema: '../persistence/schemas/passagemSchema',
  };

  const elevadorSchema = {
    // compare with the approach followed in repos and services
    name: 'elevadorSchema',
    schema: '../persistence/schemas/elevadorSchema',
  };

  const robotSchema = {
    // compare with the approach followed in repos and services
    name: 'robotSchema',
    schema: '../persistence/schemas/robotSchema',
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

  const salaController = {
    name: config.controllers.sala.name,
    path: config.controllers.sala.path
  }
  const salaService = {
    name: config.services.sala.name,
    path: config.services.sala.path
  }
  const salaRepo = {
    name: config.repos.sala.name,
    path: config.repos.sala.path
  }

  const tipoRobotController = {
    name: config.controllers.tipoRobot.name,
    path: config.controllers.tipoRobot.path
  }

  const tipoRobotService = {
    name: config.services.tipoRobot.name,
    path: config.services.tipoRobot.path
  }

  const tipoRobotRepo = {
    name: config.repos.tipoRobot.name,
    path: config.repos.tipoRobot.path
  }

  const passagemController = {
    name: config.controllers.passagem.name,
    path: config.controllers.passagem.path
  }

  const passagemRepo = {
    name: config.repos.passagem.name,
    path: config.repos.passagem.path
  }
  const passagemService = {
    name: config.services.passagem.name,
    path: config.services.passagem.path
  }

  const elevadorController = {
    name: config.controllers.elevador.name,
    path: config.controllers.elevador.path
  }

  const elevadorRepo = {
    name: config.repos.elevador.name,
    path: config.repos.elevador.path
  }

  const elevadorService = {
    name: config.services.elevador.name,
    path: config.services.elevador.path
  }

  const robotController = {
    name: config.controllers.robot.name,
    path: config.controllers.robot.path
  }

  const robotRepo = {
    name: config.repos.robot.name,
    path: config.repos.robot.path
  }

  const robotService = {
    name: config.services.robot.name,
    path: config.services.robot.path
  }

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path,
  };

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path,
  };

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      edificioSchema,
      pisoSchema,
      salaSchema,
      tipoRobotSchema,
      passagemSchema,
      elevadorSchema,
      robotSchema
    ],
    controllers: [
      roleController,
      edificioController,
      pisoController,
      salaController,
      tipoRobotController,
      passagemController,
      elevadorController,
      robotController,
      userController
    ],
    repos: [
      roleRepo,
      userRepo,
      edificioRepo,
      pisoRepo,
      salaRepo,
      tipoRobotRepo,
      passagemRepo,
      elevadorRepo,
      robotRepo
    ],
    services: [
      roleService,
      edificioService,
      pisoService,
      salaService,
      tipoRobotService,
      passagemService,
      elevadorService,
      robotService,
      userService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
