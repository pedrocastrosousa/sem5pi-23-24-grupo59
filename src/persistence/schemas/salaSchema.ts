import { ISalaPersistence } from '../../dataschema/ISalaPersistence';
import mongoose from 'mongoose';

const SalaSchema = new mongoose.Schema(
    {   
        domainId: { 
            type: String, 
            unique: true 
        },

        nomeSala: {
            type: String,
            unique: true,
            index: true
            // required: true,
        },

        categoriaSala: {
            type: String,  
            // required: true,
        },
        
        dimensaoSala: {
            type: Object,
            // required: true
        },
        
        descricaoSala: {
            type: String,  
            // required: true,
        },

        piso: {
            type: String,  
            // required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<ISalaPersistence & mongoose.Document>('Sala', SalaSchema);
