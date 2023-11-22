import { IRobotPersistence } from '../../dataschema/IRobotPersistence';
import mongoose from 'mongoose';

const RobotSchema = new mongoose.Schema(
    {
        codigoRobot: {
            type: String,
            required: true,
            unique: true,
        },
        nicknameRobot: {
            type: String,
            required: true,
        },

        tipoRobot: {
            type: String,
            required: true,
            index: true,
        },

        numeroSerieRobot: {
            type: String,
            required: true,
        },

        descricaoRobot: {
            type: String,
            required: false,
        },

        estadoRobot: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<IRobotPersistence & mongoose.Document>('Robot', RobotSchema);