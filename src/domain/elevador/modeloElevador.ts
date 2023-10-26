import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface ModeloElevadorProps {
    value: string;
  }
  
  export class ModeloElevador extends ValueObject<ModeloElevadorProps> {
    get value(): string {
      return this.props.value;
    }
  
    private constructor(props: ModeloElevadorProps) {
      super(props);
    }
  
    public static create(modeloElevador: string): Result<ModeloElevador> {
      if (modeloElevador === null || modeloElevador === undefined) {
        return Result.ok<ModeloElevador>(new ModeloElevador({ value: '' }));
      }
  
      if (modeloElevador.length > 50) {
        return Result.fail<ModeloElevador>('O modelo do elevador não pode exceder 50 caracteres.');
      }
  
      return Result.ok<ModeloElevador>(new ModeloElevador({ value: modeloElevador }));
    }
  }
  