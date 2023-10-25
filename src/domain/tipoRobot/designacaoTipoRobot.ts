import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface DesignacaoTipoRobotProps {
    designacao: string;
}

export class DesignacaoTipoRobot extends ValueObject<DesignacaoTipoRobotProps> {

    get designacao(): string{
        return this.props.designacao;
    }

    public constructor(props: DesignacaoTipoRobotProps){
        super(props);
    }

    public static create(designacao: string): Result<DesignacaoTipoRobot> {
        const guardResult = Guard.againstNullOrUndefined(designacao, 'designacao');

        if (!guardResult.succeeded) {
            return Result.fail<DesignacaoTipoRobot>(guardResult.message);
        } else {
            return Result.ok<DesignacaoTipoRobot>(new DesignacaoTipoRobot({designacao: designacao}));
        }
    }
}