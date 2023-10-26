import { ValueObject } from "../../core/domain/ValueObject";
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
    if (numeroSerieElevador.length > 50) {
      return Result.fail<NumeroSerieElevador>("O número de série não pode conter mais de 50 caracteres.");
    }

    if (!/^[a-zA-Z0-9]+$/.test(numeroSerieElevador)) {
      return Result.fail<NumeroSerieElevador>("O número de série deve ser alfanumérico.");
    }

    return Result.ok<NumeroSerieElevador>(new NumeroSerieElevador({ value: numeroSerieElevador }));
  }
}