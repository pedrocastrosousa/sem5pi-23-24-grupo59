import mongoose from 'mongoose';
import { IPisoPersistence } from '../../dataschema/IPisoPersistence';

const PisoSchema = new mongoose.Schema(
  {
    domainId: {
      type: String,
      unique: true
    },

    nome: { 
      type: String,  // Assuming NomePiso is a string
      required: true 
    },

    descricao: {  
      type: String,  // Assuming DescricaoPiso is a string
      required: true 
    },
    edificio: { 
      type: String, // Assuming Edificio is a string
      required: true 
     },
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IPisoPersistence & mongoose.Document>('Piso', PisoSchema);
