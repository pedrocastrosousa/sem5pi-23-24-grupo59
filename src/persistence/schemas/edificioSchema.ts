import { IEdificioPersistence } from '../../dataschema/IEdificioPersistence';
import mongoose from 'mongoose';

const EdificioSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true,
    },

    codigoEdificio: {
      type: String,
      required: true,
      unique: true,
    },

    descricaoEdificio: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    nomeEdificio: {
      type: String,
      optional: true,
      index: true,
    },

    dimensaoMaximaPisos: {
      comprimento: {
        type: Number,
        required: false,
        validate: {
          validator: Number.isInteger,
          message: 'Comprimento deve ser inteiro'
        },
      },
      largura: {
        type: Number,
        required: false,
        validate: {
          validator: Number.isInteger,
          message: 'Largura deve ser inteiro'
      },
    },
  },
},
    {timestamps: true},
);

export default mongoose.model<IEdificioPersistence & mongoose.Document>('Edificio', EdificioSchema);

