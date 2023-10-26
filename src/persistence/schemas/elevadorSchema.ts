import { IElevadorPersistence } from '../../dataschema/IElevadorPersistence';
import mongoose from 'mongoose';

const ElevadorSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true,
        },

        edificio: {
            type: String,
            required: true,
            index: true,
        },
        pisos: [{
            type: String,
            required: true 
        }],

        numeroSerie: {
            type: String,
            required: true,
        },

        marca: {
            type: String,
            required: false,
        },
        modelo: {
            type: String,
            required: false,
        },
        descricao: {
            type: String,
            required: false,
        },
    },
    { timestamps: true },
);

export default mongoose.model<IElevadorPersistence & mongoose.Document>('Elevador', ElevadorSchema);