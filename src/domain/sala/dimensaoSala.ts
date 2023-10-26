import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface DimensaoSalaProps {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export class DimensaoSala extends ValueObject<DimensaoSalaProps> {

  private constructor(props: DimensaoSalaProps) {
    super(props);
  }

  public static create(x1: number, y1: number, x2: number, y2: number): Result<DimensaoSala> {
    if (x1 < 0 || y1 < 0 || x2 < 0 || y2 < 0 ) {
      return Result.fail<DimensaoSala>("A sala não pode ter coordenadas negativas");
    }
    return Result.ok<DimensaoSala>(new DimensaoSala({ x1, y1, x2, y2 }));
  }
}
