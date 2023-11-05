import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
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

      let guardResult = Guard.againstEmptyOrNullOrUndefined(modeloElevador, 'Modelo do Elevador');
      if (!guardResult.succeeded) {
        return Result.ok<ModeloElevador>(new ModeloElevador({ value: '' }));
      }

      guardResult = Guard.checkStringLength(modeloElevador, 50, 'Modelo do Elevador');
      if (!guardResult.succeeded) {
        return Result.fail<ModeloElevador>(guardResult.message);
      }

      guardResult = Guard.isAlfanumericWithSpaces(modeloElevador, "Modelo do Elevador");
      if (!guardResult.succeeded) {
        return Result.fail<ModeloElevador>(guardResult.message);
      }

      return Result.ok<ModeloElevador>(new ModeloElevador({ value: modeloElevador }));
    }
  }
