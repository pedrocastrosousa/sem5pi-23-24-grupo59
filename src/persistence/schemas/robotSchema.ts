import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';

const RobotSchema = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true,
        },  
        
        codigo: {
            type: String,
            required: true,
        },
        nickname: {
            type: String,
            required: true,
        },

        tipo: {
            type: String,
            required: true,
            index: true,
        },

        numeroSerie: {
            type: String,
            required: true,
        },

        descricao: {
            type: String,
            required: false,
        },
        estado: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);