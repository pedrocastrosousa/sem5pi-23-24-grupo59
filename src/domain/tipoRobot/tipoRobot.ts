import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { DesignacaoTipoRobot } from './designacaoTipoRobot';
import { TipoTarefaTipoRobot } from './tipoTarefaTipoRobot';
import { IdTipoRobot } from './idTipoRobot';

interface TipoRobotProps {
  designacaoTipoRobot: DesignacaoTipoRobot;
  tipoTarefaTipoRobot: TipoTarefaTipoRobot;
}

export class TipoRobot extends AggregateRoot<TipoRobotProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get tipoRobotId(): IdTipoRobot {
    return new IdTipoRobot(this.tipoRobotId.toValue());
  }

  get designacaoTipoRobot(): DesignacaoTipoRobot {
    return this.props.designacaoTipoRobot;
  }

  set designacaoTipoRobot(designacaoTipoRobot: DesignacaoTipoRobot) {
    this.props.designacaoTipoRobot = designacaoTipoRobot;
  }

  get tipoTarefaTipoRobot(): TipoTarefaTipoRobot {
    return this.props.tipoTarefaTipoRobot;
  }

  set tipoTarefaTipoRobot(tipoTarefaTipoRobot: TipoTarefaTipoRobot) {
    this.props.tipoTarefaTipoRobot = tipoTarefaTipoRobot;
  }

  private constructor(props: TipoRobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: TipoRobotProps, id?: UniqueEntityID): Result<TipoRobot> {

    const guardedProps = [
      {
        argument: props.designacaoTipoRobot,
        argumentName: 'designacao',
      },
      {
        argument: props.tipoTarefaTipoRobot,
        argumentName: 'tipoTarefaTipoRobot',
      },
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<TipoRobot>(guardResult.message);
    } else {
      return Result.ok<TipoRobot>(
        new TipoRobot(
          {
            ...props,
          },
          id,
        ),
      );
    }
  }
}
