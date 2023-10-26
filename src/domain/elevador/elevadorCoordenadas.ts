import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

enum ElevadorOrientacao {
  Norte = "Norte",
  Sul = "Sul",
  Este = "Este",
  Oeste = "Oeste",
}

interface ElevadorCoordenadasProps {
  x: number;
  y: number;
  orientacao: ElevadorOrientacao;
}

export class ElevadorCoordenadas extends ValueObject<ElevadorCoordenadasProps> {
  get x(): number {
    return this.props.x;
  }

  get y(): number {
    return this.props.y;
  }

  get orientacao(): ElevadorOrientacao {
    return this.props.orientacao;
  }

  public constructor(props: ElevadorCoordenadasProps) {
    super(props);
  }

  public static create(props: ElevadorCoordenadasProps): Result<ElevadorCoordenadas> {
    
    const guardedProps = [
        { argument: props.x, argumentName: 'x' },
        { argument: props.y, argumentName: 'y' },
      ];

    const guardResult = Guard.againstNullOrUndefined(guardedProps, 'elevadorCoordenadas');

    if (!guardResult.succeeded || props.x < 0 || props.y < 0) {
        return Result.fail<ElevadorCoordenadas>(guardResult.message);
    }else{
        return Result.ok<ElevadorCoordenadas>(
            new ElevadorCoordenadas({
                ...props
            }));
    } 
  }
}
