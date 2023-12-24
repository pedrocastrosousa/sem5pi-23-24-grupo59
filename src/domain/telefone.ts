
import { Result } from "../core/logic/Result";
import { ValueObject } from "../core/domain/ValueObject";

interface ITelefone {
    numero: number;
}

export class Telefone extends ValueObject<ITelefone> {
    private constructor(props: ITelefone) {
        super(props);
    }
    get numero(): number {
        return this.props.numero;
    }

    public static create(numero: number): Result<Telefone> {
        if (numero > 999999999 || numero < 100000000 ) {
            return Result.fail<Telefone>("Número de telefone inválido");
        }
        return Result.ok<Telefone>(new Telefone({ numero: numero }));
    }

}