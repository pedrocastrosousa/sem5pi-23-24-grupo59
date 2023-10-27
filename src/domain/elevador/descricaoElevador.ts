import { ValueObject } from "../../core/domain/ValueObject";
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
    if (descricaoElevador === null || descricaoElevador === undefined) {
      return Result.ok<DescricaoElevador>(new DescricaoElevador({ value: '' }));
    }

    if (descricaoElevador.length > 250) {
      return Result.fail<DescricaoElevador>("A descrição não pode conter mais de 50 caracteres.");
    }

    if (!/^[a-zA-Z0-9]+$/.test(descricaoElevador)) {
      return Result.fail<DescricaoElevador>("A descrição deve ser alfanumérica.");
    }

    return Result.ok<DescricaoElevador>(new DescricaoElevador({ value: descricaoElevador }));
  }
}