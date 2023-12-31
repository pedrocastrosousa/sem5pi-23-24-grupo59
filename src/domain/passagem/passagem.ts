import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { Piso } from "../piso/piso";
import { PassagemId } from "./passagemId";

interface PassagemProps {
    passagemId: PassagemId;
    piso1: Piso;
    piso2: Piso;
    codigoPassagem: string;
}

export class Passagem extends AggregateRoot<PassagemProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get passagemId(): PassagemId {
        return this.props.passagemId;
    }

    get piso1(): Piso {
        return this.props.piso1;
    }

    get piso2(): Piso {
        return this.props.piso2;
    }

    get codigoPassagem(): string {
        return `${this.piso1.codigoPiso}-${this.piso2.codigoPiso}`;
    }

    private constructor(props: PassagemProps, passagemId: PassagemId) {
        super(props, passagemId);
    }


    public static create(props: PassagemProps): Result<Passagem> {

        const guardedProps = [    
            { argument: props.passagemId, argumentName: 'passagemId' },
            { argument: props.piso1, argumentName: 'piso1' },
            { argument: props.piso2, argumentName: 'piso2' },
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Passagem>(guardResult.message)
        }
        else {
            const passagem = new Passagem({
                ...props,
            }, 
            props.passagemId);
            
            return Result.ok<Passagem>(passagem);
        }


    }



    updatePiso1(piso1: Piso): void {
        if (piso1) {
            this.props.piso1 = piso1;
        }
    }

    updatePiso2(piso2: Piso): void {
        if (piso2) {
            this.props.piso2 = piso2;
        }
    }


}