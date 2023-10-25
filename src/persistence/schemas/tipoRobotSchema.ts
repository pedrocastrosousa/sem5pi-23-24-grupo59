import { ITipoRobotPersistence } from '../../dataschema/ITipoRobotPersistence';
import mongoose, { Schema } from 'mongoose';

const TipoRobotSchema = new mongoose.Schema(
    {
        domainId: { 
          type: String,
          unique: true
        },
    
        designacaoTipoRobot: {
          type: String,
          index: true,
        },
    
      },
      { timestamps: true },
);
    
export default mongoose.model<ITipoRobotPersistence & mongoose.Document>('TipoRobot', TipoRobotSchema);

