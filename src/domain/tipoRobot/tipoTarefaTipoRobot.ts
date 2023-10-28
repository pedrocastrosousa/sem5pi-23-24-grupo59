import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

enum TipoTarefaEnum {
    Gabinete = "Transporte",
    Anfiteatro = "Seguranca"
}

interface TipoTarefaTipoRobotProps {
    tipoTarefa: string[];
}

export class TipoTarefaTipoRobot extends ValueObject<TipoTarefaTipoRobotProps> {
  
  get tipoTarefa(): string[] {
    return this.props.tipoTarefa;
  }

  private constructor(props: TipoTarefaTipoRobotProps) {
    super(props);
  }

  public static create(tipoTarefaTipoRobot: string[]): Result<TipoTarefaTipoRobot> {
    const guardResult = Guard.againstNullOrUndefined(tipoTarefaTipoRobot, 'tipoTarefa');

    if (!guardResult.succeeded || tipoTarefaTipoRobot.length === 0) {
      return Result.fail<TipoTarefaTipoRobot>(guardResult.message);
    }
    
    for (const tipo of tipoTarefaTipoRobot) {
      if (!Object.values(TipoTarefaEnum).includes(tipo as TipoTarefaEnum)) {
        return Result.fail<TipoTarefaTipoRobot>('Tipo de tarefa inválido.\nTipos validos: Transporte, Seguranca.');
      }
    }

    return Result.ok<TipoTarefaTipoRobot>(new TipoTarefaTipoRobot({ tipoTarefa: tipoTarefaTipoRobot }));
  }
}
