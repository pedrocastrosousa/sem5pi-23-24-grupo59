import { ValueObject } from "../../core/domain/ValueObject";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

interface DescricaoElevadorProps {
  value: string;
}

export class DescricaoElevador extends ValueObject<DescricaoElevadorProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: DescricaoElevadorProps) {
    super(props);
  }

  public static create(descricaoElevador: string): Result<DescricaoElevador> {
    const tamanhoLimite = 250;

    let guardResult = Guard.againstNullOrUndefined(descricaoElevador, 'Descrição do Elevador');
    if (!guardResult.succeeded) {
      return Result.ok<DescricaoElevador>(new DescricaoElevador({ value: '' }));
    }

    guardResult = Guard.checkStringLength(descricaoElevador, tamanhoLimite, 'Descrição do Elevador');
    if (!guardResult.succeeded) {
      return Result.fail<DescricaoElevador>(guardResult.message);
    }

    guardResult = Guard.isAlfanumericWithSpaces(descricaoElevador, "Descrição do Elevador");
    if (!guardResult.succeeded) {
      return Result.fail<DescricaoElevador>(guardResult.message);
    }

    return Result.ok<DescricaoElevador>(new DescricaoElevador({ value: descricaoElevador }));
  }
}
