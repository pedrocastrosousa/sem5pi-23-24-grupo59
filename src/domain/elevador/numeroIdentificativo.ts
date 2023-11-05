import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";

export class NumeroIdentificativo extends UniqueEntityID {

    private constructor(numeroIdentificativo: string) {
        super(numeroIdentificativo);
    }

    public static create(numeroIdentificativo: string): Result<NumeroIdentificativo> {

        const guardResult = Guard.againstEmptyOrNullOrUndefined(numeroIdentificativo, 'Número Identificativo do Elevador');
        if (!guardResult.succeeded) {
            return Result.fail<NumeroIdentificativo>(guardResult.message);
        }

        return Result.ok<NumeroIdentificativo>(new NumeroIdentificativo(numeroIdentificativo));
    }
}

