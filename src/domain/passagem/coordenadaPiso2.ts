import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Result } from "../../core/logic/Result";
import { Piso } from "../piso/piso";

interface CoordenadaPiso2Props{
    x: number;
    y: number;
    piso: Piso;
}

export class CoordenadaPiso2 extends AggregateRoot<CoordenadaPiso2Props>{
    get piso(): Piso {
        return this.props.piso;
    }

    public static create(x: number, y: number, piso: Piso): Result<CoordenadaPiso2> {
      
        return Result.ok<CoordenadaPiso2>(new CoordenadaPiso2({ x, y,piso }));
      }

}