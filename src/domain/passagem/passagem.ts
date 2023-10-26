import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { Piso } from "../piso/piso";
import { PassagemId } from "./passagemId";

interface PassagemProps {
    piso1: Piso;
    piso2: Piso;
  }
  
  export class Passagem extends AggregateRoot<PassagemProps> {
    get id (): UniqueEntityID {
      return this._id;
    }
  
    get passagemId (): PassagemId {
      return new PassagemId(this.passagemId.toValue());
    }

    get piso1(): Piso {
        return this.props.piso1;
    }

    get piso2(): Piso {
        return this.props.piso2;
    }

    private constructor(props: PassagemProps, id?: UniqueEntityID) {
        super(props, id);
    }


    public static create(props: PassagemProps, id?: UniqueEntityID): Result<Passagem> {

        const guardedProps = [
            { argument: props.piso1, argumentName: 'piso1' },
            { argument: props.piso2, argumentName: 'piso2' },
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