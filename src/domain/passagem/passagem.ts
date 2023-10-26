import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { CoordenadaPiso1 } from "./coordenadaPiso1";
import { CoordenadaPiso2 } from "./coordenadaPiso2";
import { PassagemId } from "./passagemId";

interface PassagemProps {
    coordenadaPiso1: CoordenadaPiso1;
    coordenadaPiso2: CoordenadaPiso2;
  }
  
  export class Passagem extends AggregateRoot<PassagemProps> {
    get id (): UniqueEntityID {
      return this._id;
    }
  
    get passagemId (): PassagemId {
      return new PassagemId(this.passagemId.toValue());
    }

    get coordenadaPiso1(): CoordenadaPiso1 {
        return this.props.coordenadaPiso1;
    }

    get coordenadaPiso2(): CoordenadaPiso2 {
        return this.props.coordenadaPiso2;
    }

    private constructor(props: PassagemProps, id?: UniqueEntityID) {
        super(props, id);
    }


    public static create(props: PassagemProps, id?: UniqueEntityID): Result<Passagem> {

        const guardedProps = [
            { argument: props.coordenadaPiso1, argumentName: 'coordenadaPiso1' },
            { argument: props.coordenadaPiso2, argumentName: 'coordenadaPiso2' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Passagem>(guardResult.message)
        }
        else {
            const passagem = new Passagem({
                ...props
            }, id);

            return Result.ok<Passagem>(passagem);
        }
    }


}