import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";


interface CodigoEdificioProps {
    value: string;
}

export class CodigoEdificio extends ValueObject<CodigoEdificioProps> {
    get value(): string {
        return this.props.value;
    }
    

    private constructor(props: CodigoEdificioProps) {
        super(props);
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

        return Result.ok<CodigoEdificio>(new CodigoEdificio({ value: codigoEdificio }));
    }
}