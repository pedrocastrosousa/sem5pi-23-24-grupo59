import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";

export class PassagemId extends UniqueEntityID {
    public constructor(passagemId: string) {
        super(passagemId);
    }

    public static create(passagemId: string): Result<PassagemId> {
       
        return Result.ok<PassagemId>(new PassagemId(passagemId));
    }
}