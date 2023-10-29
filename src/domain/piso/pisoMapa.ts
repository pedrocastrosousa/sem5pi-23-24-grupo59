import { ValueObject } from "../../core/domain/ValueObject";
import { Guard, IGuardResult } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";


interface Divisao {
  id: string;
  posicaoInicial: number[];
  posicaoFinal: number[];
}

interface PisoMapaProps {
  mapa: number[][];
  sala: Divisao[];
  elevador: Divisao[];
  passagem: Divisao[];
}

export class PisoMapa extends ValueObject<PisoMapaProps> {
  get value(): PisoMapaProps {
    return this.props;
  }
  
  private constructor(props: PisoMapaProps) {
    super(props);
  }

  public static create(mapa: PisoMapaProps): Result<PisoMapa> {

     let guardResults:IGuardResult[]=[];

        const guardResult = Guard.combine(guardResults);

        if (!guardResult.succeeded) {
            return Result.fail<PisoMapa>(guardResult.message);
        } else {
            return Result.ok<PisoMapa>(new PisoMapa(mapa));
        }
  }
}