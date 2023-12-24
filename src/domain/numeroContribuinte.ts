
import { Result } from "../core/logic/Result";
import { ValueObject } from "../core/domain/ValueObject";

interface INumeroContribuinte {
    numero: number;
}

export class NumeroContribuinte extends ValueObject<INumeroContribuinte> {
    private constructor(props: INumeroContribuinte) {
        super(props);
    }
    get numero(): number {
        return this.props.numero;
    }

    public static create(numero: number): Result<NumeroContribuinte> {
        if (numero > 999999999 || numero < 100000000 ) {
                        return Result.fail<NumeroContribuinte>("Número de contribuinte inválido");
        }
        return Result.ok<NumeroContribuinte>(new NumeroContribuinte({ numero: numero }));
    }




}

