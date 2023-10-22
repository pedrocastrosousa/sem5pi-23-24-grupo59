import {ValueObject} from "../../core/domain/ValueObject";
import {Result} from "../../core/logic/Result";
import {Guard} from "../../core/logic/Guard";

interface DimensaoMaximaPisosProps {
    comprimento: number;
    largura: number;
}

export class DimensaoMaximaPisos extends ValueObject<DimensaoMaximaPisosProps>{

    get comprimento(): number{
        return this.props.comprimento;
    }

    get largura(): number{
        return this.props.largura;
    }

    public constructor(props: DimensaoMaximaPisosProps){
        super(props);
    }

    public static create(props: DimensaoMaximaPisosProps): Result<DimensaoMaximaPisos> {

        const guardedProps = [
            { argument: props.comprimento, argumentName: 'comprimento' },
            { argument: props.largura, argumentName: 'largura' },
          ];

        const guardResult = Guard.againstNullOrUndefined(guardedProps, 'dimensaoMaximaPisos');

        if (!guardResult.succeeded || props.comprimento < 0 || props.largura < 0) {
            return Result.fail<DimensaoMaximaPisos>(guardResult.message);
        }else{
            return Result.ok<DimensaoMaximaPisos>(
                new DimensaoMaximaPisos({
                    ...props
                }));
        } 
        
    }
}