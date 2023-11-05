import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
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

      let guardResult = Guard.againstNullOrUndefined(marcaElevador, 'Marca do Elevador');
      if (!guardResult.succeeded) {
        return Result.ok<MarcaElevador>(new MarcaElevador({ value: '' }));
      }

      guardResult = Guard.checkStringLength(marcaElevador, 50, 'Marca do Elevador');
      if (!guardResult.succeeded) {
        return Result.fail<MarcaElevador>(guardResult.message);
      }

      guardResult = Guard.isAlfanumericWithSpaces(marcaElevador, "Marca do Elevador");
      if (!guardResult.succeeded) {
        return Result.fail<MarcaElevador>(guardResult.message);
      }

      return Result.ok<MarcaElevador>(new MarcaElevador({ value: marcaElevador }));
    }
  }
