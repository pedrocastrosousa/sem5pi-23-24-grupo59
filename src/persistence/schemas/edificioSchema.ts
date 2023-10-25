import { IEdificioPersistence } from '../../dataschema/IEdificioPersistence';
import mongoose, { Schema } from 'mongoose';

const EdificioSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },
    
    codigoEdificio: {
      type: String,
      unique: true
    },

    descricaoEdificio: {
      type: String,
      index: true,
    },

    nomeEdificio: {
      type: String,
      optional: true,
      index: true,
    },

    dimensaoMaximaPisos: {
      type: Object,
      index: true,
    },

  },
  { timestamps: true },
);

export default mongoose.model<IEdificioPersistence & mongoose.Document>('Edificio', EdificioSchema);

