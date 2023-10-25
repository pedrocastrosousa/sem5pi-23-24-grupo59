import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface PisoDescricaoProps {
  value: string;
}

export class PisoDescricao extends ValueObject<PisoDescricaoProps> {
  get value(): string {
    return this.props.value;
  }
  
  private constructor(props: PisoDescricaoProps) {
    super(props);
  }

  public static create(pisoDescricao: string): Result<PisoDescricao> {
    return Result.ok<PisoDescricao>(new PisoDescricao({ value: pisoDescricao }))
  }
}