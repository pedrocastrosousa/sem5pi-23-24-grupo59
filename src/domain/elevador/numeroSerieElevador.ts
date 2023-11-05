import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface NumeroSerieElevadorProps {
  value: string;
}

export class NumeroSerieElevador extends ValueObject<NumeroSerieElevadorProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: NumeroSerieElevadorProps) {
    super(props);
  }

  public static create(numeroSerieElevador: string): Result<NumeroSerieElevador> {

    let guardResult = Guard.againstEmptyOrNullOrUndefined(numeroSerieElevador, 'Numero de Serie do Elevador');
    if (!guardResult.succeeded) {
      return Result.ok<NumeroSerieElevador>(new NumeroSerieElevador({ value: '' }));
    }

    guardResult = Guard.checkStringLength(numeroSerieElevador, 50, 'Numero de Serie do Elevador');
    if (!guardResult.succeeded) {
      return Result.fail<NumeroSerieElevador>(guardResult.message);
    }

    guardResult = Guard.isAlfanumericWithoutSpaces(numeroSerieElevador, "Numero de Serie do Elevador");
    if (!guardResult.succeeded) {
      return Result.fail<NumeroSerieElevador>(guardResult.message);
    }

    return Result.ok<NumeroSerieElevador>(new NumeroSerieElevador({ value: numeroSerieElevador }));
  }
}
