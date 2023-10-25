import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface PisoNomeProps {
  value: string;
}

export class PisoNome extends ValueObject<PisoNomeProps> {
  get value(): string {
    return this.props.value;
  }

  private constructor(props: PisoNomeProps) {
    super(props);
  }

  public static create(pisoNome: string): Result<PisoNome> {
    return Result.ok<PisoNome>(new PisoNome({ value: pisoNome }))
  }
}