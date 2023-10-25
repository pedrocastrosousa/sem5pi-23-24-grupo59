import { AggregateRoot } from '../../core/domain/AggregateRoot';
import { UniqueEntityID } from '../../core/domain/UniqueEntityID';
import { Result } from '../../core/logic/Result';
import { Guard } from '../../core/logic/Guard';
import { DesignacaoTipoRobot } from './designacaoTipoRobot';
import { IdTipoRobot } from './idTipoRobot';

interface TipoRobotProps {
  designacaoTipoRobot: DesignacaoTipoRobot;
}

export class TipoRobot extends AggregateRoot<TipoRobotProps> {
  get id(): UniqueEntityID {
    return this._id;
  }

  get idTipoRobot(): IdTipoRobot {
    return new IdTipoRobot(this.idTipoRobot.toValue());
  }

  get designacaoTipoRobot(): DesignacaoTipoRobot {
    return this.props.designacaoTipoRobot;
  }

  set idTipoRobot(designacaoTipoRobot: DesignacaoTipoRobot) {
    this.props.designacaoTipoRobot = designacaoTipoRobot;
  }

  private constructor(props: TipoRobotProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create(props: TipoRobotProps, id?: UniqueEntityID): Result<TipoRobot> {
    const guardedProps = [{ argument: props.designacaoTipoRobot, argumentName: 'designacao' }];

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
