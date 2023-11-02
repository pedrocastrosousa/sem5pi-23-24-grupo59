import { expect } from 'chai';
import { TipoTarefaTipoRobot } from '../../../../src/domain/tipoRobot/tipoTarefaTipoRobot';


describe('TipoTarefa Type Unit Tests', () => {
  it('create valid tipoTarefa type (Vigilancia)', () => {
    const tipoTarefa: string[] = ['Vigilancia'];
    const tipoTarefaTipoRobot = TipoTarefaTipoRobot.create(tipoTarefa);

    expect(tipoTarefaTipoRobot.isSuccess).to.equal(true);
  });

  it('create valid tipoTarefa type (Pickupndelivery)', () => {
    const tipoTarefa: string[] = ['Pickupndelivery'];
    const tipoTarefaTipoRobot = TipoTarefaTipoRobot.create(tipoTarefa);

    expect(tipoTarefaTipoRobot.isSuccess).to.equal(true);
  });

  it('create valid tipoTarefa type (Pickupndelivery e Vigilancia)', () => {
    const tipoTarefa: string[] = ['Pickupndelivery','Vigilancia'];
    const tipoTarefaTipoRobot = TipoTarefaTipoRobot.create(tipoTarefa);

    expect(tipoTarefaTipoRobot.isSuccess).to.equal(true);
  });

  it('create valid tipoTarefa type non sensitive case (Vigilancia)', () => {
    const tipoTarefa: string[] = ['VigilANcia'];
    const tipoTarefaTipoRobot = TipoTarefaTipoRobot.create(tipoTarefa);

    expect(tipoTarefaTipoRobot.isSuccess).to.equal(true);
  });

  it('create valid tipoTarefa type non sensitive case (Pickupndelivery)', () => {
    const tipoTarefa: string[] = ['PiCKupnDElivery'];
    const tipoTarefaTipoRobot = TipoTarefaTipoRobot.create(tipoTarefa);

    expect(tipoTarefaTipoRobot.isSuccess).to.equal(true);
  });

  it('create valid tipoTarefa type non sensitive case (Pickupndelivery e Vigilancia)', () => {
    const tipoTarefa: string[] = ['VigilANcia', 'PiCKupnDElivery'];
    const tipoTarefaTipoRobot = TipoTarefaTipoRobot.create(tipoTarefa);

    expect(tipoTarefaTipoRobot.isSuccess).to.equal(true);
  });

  it('fail creating null tipoTarefa type', () => {
    const tipoTarefa: string[] = [];
    const tipoTarefaTipoRobot = TipoTarefaTipoRobot.create(tipoTarefa);

    expect(tipoTarefaTipoRobot.isFailure).to.equal(true);
  });

});
