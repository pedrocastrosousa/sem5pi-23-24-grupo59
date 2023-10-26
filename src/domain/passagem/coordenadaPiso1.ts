import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { Result } from "../../core/logic/Result";
import { Piso } from "../piso/piso";

interface CoordenadaPiso1Props {
    x: number;
    y: number;
    piso: Piso;
}

export class CoordenadaPiso1 extends AggregateRoot<CoordenadaPiso1Props>{
    get piso(): Piso {
        return this.props.piso;
    }
    get x(): number {
        return this.props.x;
    }

    get y(): number {
        return this.props.y;
    }

    public static create(x: number, y: number, piso: Piso): Result<CoordenadaPiso1> {

        return Result.ok<CoordenadaPiso1>(new CoordenadaPiso1({ x, y, piso }));
    }

}