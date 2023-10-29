import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

enum TipoTarefaEnum {
    TRANSPORTE = "Transporte",
    SEGURANCA = "Seguranca"
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
      const tipoTarefaEnumValue = TipoTarefaEnum[tipo.toUpperCase()];
      if (!tipoTarefaEnumValue) {
        return Result.fail<TipoTarefaTipoRobot>('Tipo de tarefa inválido.\nTipos validos: Transporte, Seguranca.');
      }
    }

    const tipoTarefaParsed = tipoTarefaTipoRobot.map((tipoTarefaTipoRobot) => {
      const tipoTarefaValue = TipoTarefaEnum[tipoTarefaTipoRobot.toUpperCase()] as TipoTarefaEnum;
      return tipoTarefaValue;
    })

    return Result.ok<TipoTarefaTipoRobot>(new TipoTarefaTipoRobot({ tipoTarefa: tipoTarefaParsed }));
  }
}
