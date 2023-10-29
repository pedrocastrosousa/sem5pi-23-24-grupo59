import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface PisoMapaProps {
  value: string;
}

export class PisoMapa extends ValueObject<PisoMapaProps> {
  get value(): string {
    return this.props.value;
  }
  
  private constructor(props: PisoMapaProps) {
    super(props);
  }

  public static create(pisoMapa: string): Result<PisoMapa> {
    return Result.ok<PisoMapa>(new PisoMapa({ value: pisoMapa }))
  }
}