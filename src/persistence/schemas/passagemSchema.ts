import mongoose from "mongoose";
import { IPassagemPersistence } from "../../dataschema/IPassagemPersistence";

const PassagemSchema = new mongoose.Schema(
  {
    domainId: { 
      type: String, 
      unique: true 
    },
      
    coordenadasPiso1: {
      x: {
          type: Number,  // Assuming X is a number
          required: true,
          validate: {
            validator: Number.isInteger,  // Ensure it's an integer
            message: 'X must be an integer',
          },
        },
        y:  {
            type: Number,  // Assuming Y is a number
            required: true,
            validate: {
              validator: Number.isInteger,  // Ensure it's an integer
              message: 'Y must be an integer',
            },
        },
        piso:{
            type: String,
            required: true,
        }
      },

      coordenadasPiso2: {
        x: {
            type: Number,  // Assuming X is a number
            required: true,
            validate: {
              validator: Number.isInteger,  // Ensure it's an integer
              message: 'X must be an integer',
            },
          },
          y:  {
              type: Number,  // Assuming Y is a number
              required: true,
              validate: {
                validator: Number.isInteger,  // Ensure it's an integer
                message: 'Y must be an integer',
              },
          },
          piso:{
              type: String,
              required: true,
          }
        },
     
    },
    { timestamps: true },
);

export default mongoose.model<IPassagemPersistence & mongoose.Document>('Passagem', PassagemSchema);
