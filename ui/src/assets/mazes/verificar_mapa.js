schema: {
  "type": "object",
  "properties": {
    "groundTextureUrl": { "type": "string" },
    "wallTextureUrl": { "type": "string" },
    "size": {
      "type": "object",
      "properties": {
        "width": { "type": "integer" },
        "height": { "type": "integer" }
      },
      "required": ["width", "height"]
    },
    "map": {
      "type": "array",
      "items": {
        "type": "array",
        "items": { "type": "integer" }
      }
    },
    "initialPosition": { "type": "array", "items": {  "type": "number" }  },
    "initialDirection": { "type": "number" },
    "exitLocation": {
      "type": "array",
      "items": {  "type": "number" } }
    ,
    "mapa": {
      "type": "object",
      "properties": {
        "codigoPiso": { "type": "string" },
        "codigoEdificio": { "type": "string" },
        "tamanho": {
          "type": "object",
          "properties": {
            "comprimento": { "type": "integer" },
            "largura": { "type": "integer" }
          },
          "required": ["comprimento", "largura"]
        },
        "salas": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "nomeSala": { "type": "string" },
              "dimensaoSala": {
                "type": "object",
                "properties": {
                  "x1": { "type": "integer" },
                  "y1": { "type": "integer" },
                  "x2": { "type": "integer" },
                  "y2": { "type": "integer" }
                },
                "required": ["x1", "y1", "x2", "y2"]
              },
              "porta": {
                "type": "object",
                "properties": {
                  "x1": { "type": "integer" },
                  "y1": { "type": "integer" },
                  "direcao": { "type": "number" }
                },
                "required": ["x1", "y1", "direcao"]
              }
            },
            "required": ["nomeSala", "dimensaoSala", "porta"]
          }
        },
        "elevadores": {
          "type": "object",
          "properties": {
            "numeroIdentificativo": { "type": "string" },
            "posicao":  { "type": "array", "items": {  "type": "number" }  },
            "direcao": { "type": "number" }
          },
          "required": ["numeroIdentificativo", "posicao", "direcao"]
        },
        "passagem": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "piso1": { "type": "string" },
              "piso2": { "type": "string" },
              "fromX": { "type": "integer" },
              "fromY": { "type": "integer" },
              "toX": { "type": "integer" },
              "toY": { "type": "integer" }
            },
            "required": ["piso1", "piso2", "fromX", "fromY", "toX", "toY"]
          }
        }
      },
      "required": ["codigoPiso", "codigoEdificio", "tamanho", "salas", "elevadores", "passagem"]
    }
  },
  "required": ["groundTextureUrl", "wallTextureUrl", "size", "map", "initialPosition", "initialDirection", "exitLocation", "mapa"]
},
