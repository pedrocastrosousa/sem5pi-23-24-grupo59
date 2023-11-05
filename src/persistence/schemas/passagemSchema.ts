import mongoose from "mongoose";
import { IPassagemPersistence } from "../../dataschema/IPassagemPersistence";

const PassagemSchema = new mongoose.Schema(
  {
    passagemId: {
      type: String,
      required: true,
      unique: true
    },
    piso1: {
      type: String,
      required: true,
      index: true
    },

    piso2: {
      type: String,
      required: true,
      index: true
    },
    codigoPassagem: {
      type: String,
      unique: true,
      index: true,
    }
  },

  { timestamps: true },
);

PassagemSchema.index({ piso1: 1, piso2: 1 }, { unique: true });

export default mongoose.model<IPassagemPersistence & mongoose.Document>('Passagem', PassagemSchema);
