import { expect } from 'chai';
import { UniqueEntityID } from '../../../../src/core/domain/UniqueEntityID';
import { DesignacaoTipoRobot } from '../../../../src/domain/tipoRobot/designacaoTipoRobot';
import { TipoTarefaTipoRobot } from '../../../../src/domain/tipoRobot/tipoTarefaTipoRobot';
import { TipoRobot } from '../../../../src/domain/tipoRobot/tipoRobot';

describe('TipoRobot test', () => {
  it('create valid TipoRobot', () => {
    const tipoRobotProps = {
      designacaoTipoRobot: DesignacaoTipoRobot.create('designacao').getValue(),
      tipoTarefaTipoRobot: TipoTarefaTipoRobot.create(['Vigilancia']).getValue(),
    };
    const robot = TipoRobot.create(tipoRobotProps, new UniqueEntityID());

    expect(robot.isSuccess).to.be.true;
  });

  it('fail to create TipoRobot without designacao', () => {
    expect(() => {
      TipoRobot.create(
        {
          designacaoTipoRobot: DesignacaoTipoRobot.create('').getValue(),
          tipoTarefaTipoRobot: TipoTarefaTipoRobot.create(['Vigilancia']).getValue(),
        },
        new UniqueEntityID(),
      );
    }).to.throw();
  });

  it('fail to create TipoRobot without tipoTarefa', () => {
    expect(() => {
      TipoRobot.create(
        {
          designacaoTipoRobot: DesignacaoTipoRobot.create('designacao').getValue(),
          tipoTarefaTipoRobot: TipoTarefaTipoRobot.create(['']).getValue(),
        },
        new UniqueEntityID(),
      );
    }).to.throw();
  });

  it('fail to create TipoRobot with invalid tipoTarefa', () => {
    expect(() => {
      TipoRobot.create(
        {
          designacaoTipoRobot: DesignacaoTipoRobot.create('designacao').getValue(),
          tipoTarefaTipoRobot: TipoTarefaTipoRobot.create(['Fail']).getValue(),
        },
        new UniqueEntityID(),
      );
    }).to.throw();
  });
});
