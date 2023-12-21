import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port : optional change to 4000 by JRT
   */
  port: parseInt(process.env.PORT, 10) || 4000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb+srv://1200967:DsTqN5R2VPWqJuBH@cluster0.1fp1yyf.mongodb.net/?retryWrites=true&w=majority",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  schema: {
    type: "object",
    properties: {
      groundTextureUrl: { type: "string" },
      wallTextureUrl: { type: "string" },
      size: {
        type: "object",
        properties: {
          width: { type: "integer" },
          height: { type: "integer" },
        },
        required: ["width", "height"],
      },
      map: {
        type: "array",
        items: {
          type: "array",
          items: { type: "integer" },
        },
      },
      initialPosition: { type: "array", items: { type: "number" } },
      initialDirection: { type: "number" },
      exitLocation: { type: "array", items: { type: "number" } },
      mapa: {
        type: "object",
        properties: {
          codigoPiso: { type: "string" },
          codigoEdificio: { type: "string" },
          tamanho: {
            type: "object",
            properties: {
              comprimento: { type: "integer" },
              largura: { type: "integer" },
            },
            required: ["comprimento", "largura"],
          },
          salas: {
            type: "array",
            items: {
              type: "object",
              properties: {
                nomeSala: { type: "string" },
                dimensaoSala: {
                  type: "object",
                  properties: {
                    x1: { type: "integer" },
                    y1: { type: "integer" },
                    x2: { type: "integer" },
                    y2: { type: "integer" },
                  },
                  required: ["x1", "y1", "x2", "y2"],
                },
                porta: {
                  type: "object",
                  properties: {
                    x1: { type: "number" },
                    y1: { type: "number" },
                    direcao: { type: "number" },
                  },
                  required: ["x1", "y1", "direcao"],
                },
                acesso: {
                  type: "object",
                  properties: {
                    x1: { type: "number" },
                    y1: { type: "number" },
                  },
                  required: ["x1", "y1"],
                },
              },
              required: ["nomeSala", "dimensaoSala", "porta", "acesso"],
            },
          },
          elevadores: {
            type: "object",
            properties: {
              numeroIdentificativo: { type: "string" },
              posicao: { type: "array", items: { type: "number" } },
              direcao: { type: "number" },
              acesso: {
                type: "object",
                properties: {
                  x1: { type: "number" },
                  y1: { type: "number" },
                },
                required: ["x1", "y1"],
              },
            },
            required: ["numeroIdentificativo", "posicao", "direcao", "acesso"],
          },
          passagem: {
            type: "array",
            items: {
              type: "object",
              properties: {
                edificio1: { type: "string" },
                edificio2: { type: "string" },
                piso1: { type: "string" },
                piso2: { type: "string" },
                fromX: { type: "integer" },
                fromY: { type: "integer" },
                toX: { type: "integer" },
                toY: { type: "integer" },
                acesso: {
                  type: "object",
                  properties: {
                    x1: { type: "number" },
                    y1: { type: "number" },
                  },
                  required: ["x1", "y1"],
                },
              },
              required: ["edificio1", "edificio2", "piso1", "piso2", "fromX", "fromY", "toX", "toY", "acesso"],
            },
          },
        },
        required: [
          "codigoPiso",
          "codigoEdificio",
          "tamanho",
          "salas",
          "elevadores",
          "passagem",
        ],
      },
      player: {
        type: "object",
        properties: {
          initialPosition: { type: "array", items: { type: "number" } },
          initialDirection: { type: "number" },
        },
        required: ["initialPosition", "initialDirection"],
      },
    },
    required: ["groundTextureUrl", "wallTextureUrl", "size", "map", "initialPosition", "initialDirection", "exitLocation", "mapa", "player"],
  },

  controllers: {
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    edificio: {
      name: "EdificioController",
      path: "../controllers/edificioController"
    },
    piso: {
      name: "PisoController",
      path: "../controllers/pisoController"
    },
    sala: {
      name: "SalaController",
      path: "../controllers/salaController"
    },
    tipoRobot: {
      name: "TipoRobotController",
      path: "../controllers/tipoRobotController"
    },
    passagem: {
      name: "PassagemController",
      path: "../controllers/passagemController"
    },
    elevador: {
      name: "ElevadorController",
      path: "../controllers/elevadorController"
    },
    robot: {
      name: "RobotController",
      path: "../controllers/robotController"
    },
  },

  repos: {
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    edificio: {
      name: "EdificioRepo",
      path: "../repos/edificioRepo"
    },
    piso: {
      name: "PisoRepo",
      path: "../repos/pisoRepo"
    },
    sala: {
      name: "SalaRepo",
      path: "../repos/salaRepo"
    },
    tipoRobot: {
      name: "TipoRobotRepo",
      path: "../repos/tipoRobotRepo"
    },
    passagem: {
      name: "PassagemRepo",
      path: "../repos/passagemRepo"
    },
    elevador: {
      name: "ElevadorRepo",
      path: "../repos/elevadorRepo"
    },
    robot: {
      name: "RobotRepo",
      path: "../repos/robotRepo"
    },
  },


  services: {
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    edificio: {
      name: "EdificioService",
      path: "../services/edificioService"
    },
    piso: {
      name: "PisoService",
      path: "../services/pisoService"
    },
    sala: {
      name: "SalaService",
      path: "../services/salaService"
    },
    tipoRobot: {
      name: "TipoRobotService",
      path: "../services/tipoRobotService"
    },
    passagem: {
      name: "PassagemService",
      path: "../services/passagemService"
    },
    elevador: {
      name: "ElevadorService",
      path: "../services/elevadorService"
    },
    robot: {
      name: "RobotService",
      path: "../services/robotService"
    },
  },
};
