import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface DescricaoEdificioProps {
    descricao: string;
}

export class DescricaoEdificio extends ValueObject<DescricaoEdificioProps>{

    get descricao(): string{
        return this.props.descricao;
    }

    public constructor(props: DescricaoEdificioProps){
        super(props);
    }

    public static create(descricao: string): Result<DescricaoEdificio> {
        const guardResult = Guard.againstNullOrUndefined(descricao, 'descricao');

        if (!guardResult.succeeded) {
            return Result.fail<DescricaoEdificio>(guardResult.message);
        } else {
            return Result.ok<DescricaoEdificio>(new DescricaoEdificio({descricao: descricao}));
        }
    }
}