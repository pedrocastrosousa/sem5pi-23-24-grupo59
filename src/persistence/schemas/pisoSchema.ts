import mongoose from 'mongoose';
import { IPisoPersistence } from '../../dataschema/IPisoPersistence';
import { Edificio } from '../../domain/edificio/edificio';
import edificioRoute from '../../api/routes/edificioRoute';

const PisoSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },

    nome: { 
      type: String,  // Assuming NomePiso is a string
      required: true ,
      index: true,
    },

    descricao: {  
      type: String,  // Assuming DescricaoPiso is a string
      required: true,
      index: true,
    },
    edificio: { 
      type: String, // Assuming Edificio is a string
      required: true,
      index: true,
     },
  },
  {
    timestamps: true
  }
);
PisoSchema.index({ numPiso: 1, edificio: 1 }, { unique: true });
export default mongoose.model<IPisoPersistence & mongoose.Document>('Piso', PisoSchema);