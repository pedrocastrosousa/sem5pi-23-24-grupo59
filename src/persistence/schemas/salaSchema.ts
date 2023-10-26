import { ISalaPersistence } from '../../dataschema/ISalaPersistence';
import mongoose from 'mongoose';

const SalaSchema = new mongoose.Schema(
    {   
        domainId: { 
            type: String, 
            unique: true 
        },

        categoriaSala: {
            type: String,  //ENUMCAT!!! enum da categoria ver como se faz
            // required: true,
        },
        
        dimensaoSala: {
            type: Object,
            // required: true
        },
        
        descricaoSala: {
            type: String,  // Assuming DescricaoSala is a string
            // required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<ISalaPersistence & mongoose.Document>('Sala', SalaSchema);
