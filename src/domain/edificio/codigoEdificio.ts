import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";


export class CodigoEdificio extends UniqueEntityID {

    private constructor(codigoEdificio: string) {
        super(codigoEdificio);
    }

    public static create(codigoEdificio: string): Result<CodigoEdificio> {
        if (!codigoEdificio) {
            return Result.fail<CodigoEdificio>("O código do edifício é obrigatório.");
        }

        codigoEdificio = codigoEdificio.trim(); // Remover espaços em branco extra

        if (codigoEdificio.length > 5) {
            return Result.fail<CodigoEdificio>("O código do edifício não pode conter mais do que 5 caracteres.");
        }

        if (!/^[a-zA-Z0-9 ]+$/.test(codigoEdificio)) {
            return Result.fail<CodigoEdificio>("O código do edifício deve conter apenas letras, dígitos e espaços.");
        }

        return Result.ok<CodigoEdificio>(new CodigoEdificio(codigoEdificio));
    }
}