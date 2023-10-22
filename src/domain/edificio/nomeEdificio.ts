import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface NomeEdificioProps {
    nome: string;
}

export class NomeEdificio extends ValueObject<NomeEdificioProps>{

    get nome(): string{
        return this.props.nome;
    }

    public constructor(props: NomeEdificioProps){
        super(props);
    }

    public static create(nomeEdificio: string): Result<NomeEdificio> {
        if(!nomeEdificio ){
            return Result.ok<null>(null);
        }
        if ( nomeEdificio.length > 50) {
            return Result.fail<NomeEdificio>('Excedeu o limite do tamanho do nome de edificio!');
        } else {
            return Result.ok<NomeEdificio>(new NomeEdificio({nome: nomeEdificio}));
        }
    }
}