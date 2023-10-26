import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface MarcaElevadorProps {
    value: string;
  }
  
  export class MarcaElevador extends ValueObject<MarcaElevadorProps> {
    get value(): string {
      return this.props.value;
    }
  
    private constructor(props: MarcaElevadorProps) {
      super(props);
    }
  
    public static create(marcaElevador: string): Result<MarcaElevador> {
      if (marcaElevador === null || marcaElevador === undefined) {
        return Result.ok<MarcaElevador>(new MarcaElevador({ value: '' }));
      }
  
      if (marcaElevador.length > 50) {
        return Result.fail<MarcaElevador>('A marca do elevador não pode exceder 50 caracteres.');
      }
  
      return Result.ok<MarcaElevador>(new MarcaElevador({ value: marcaElevador }));
    }
  }
  