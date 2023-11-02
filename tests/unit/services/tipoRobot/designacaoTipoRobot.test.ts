import { expect } from 'chai';
import { DesignacaoTipoRobot } from '../../../../src/domain/tipoRobot/designacaoTipoRobot';

describe('DesignacaoTipoRobot Unit Tests', () => {
  it('create valid designacaoTipoRobot', () => {
    const value = 'designacao';
    const designacao = DesignacaoTipoRobot.create(value);
    expect(designacao.isSuccess).to.equal(true);
  });

  it('fail to create DesignacaoTipoRobot with empty string', () => {
    const value = '';
    const designacao = DesignacaoTipoRobot.create(value);
    expect(designacao.isFailure).to.equal(true);
  });

  it('fail to create designacaoTipoRobot with null string', () => {
    const value = null;
    const designacao = DesignacaoTipoRobot.create(value);
    expect(designacao.isFailure).to.equal(true);
  });

  it('fail to create designacaoTipoRobot with undefined string', () => {
    const value = undefined;
    const designacao = DesignacaoTipoRobot.create(value);
    expect(designacao.isFailure).to.equal(true);
  });
});
