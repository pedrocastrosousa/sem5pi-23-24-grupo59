import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";

export class NumeroIdentificativo extends UniqueEntityID {

    private constructor(numeroIdentificativo: string) {
        super(numeroIdentificativo);
    }

    public static create(numeroIdentificativo: string): Result<NumeroIdentificativo> {
        if (!numeroIdentificativo) {
            return Result.fail<NumeroIdentificativo>("O número identificativo do elevador é obrigatório.");
        }

        return Result.ok<NumeroIdentificativo>(new NumeroIdentificativo(numeroIdentificativo));
    }
}

