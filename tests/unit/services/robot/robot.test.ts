import { expect } from 'chai';
import sinon from 'sinon';
import { UniqueEntityID } from '../../../../src/core/domain/UniqueEntityID';
import { Robot } from '../../../../src/domain/robot/robot';
import { NicknameRobot } from "../../../../src/domain/robot/nicknameRobot";
import { CodigoRobot } from "../../../../src/domain/robot/codigoRobot";
import { NumeroSerieRobot } from "../../../../src/domain/robot/numeroSerieRobot";
import { DescricaoRobot } from "../../../../src/domain/robot/descricaoRobot";
import { TipoRobot } from "../../../../src/domain/tipoRobot/tipoRobot";
import { EstadoRobot } from "../../../../src/domain/robot/estadoRobot";

describe('Robot', () => {

  let tipoRobotStub;

  beforeEach(() => {
    tipoRobotStub = sinon.createStubInstance(TipoRobot);
  });


  it('deve criar um Robot com sucesso com todos os atributos válidos', () => {
    const robotProps = {
      codigoRobot: CodigoRobot.create('R001').getValue(),
      nicknameRobot: NicknameRobot.create('Robot1').getValue(),
      tipoRobot: tipoRobotStub,
      numeroserieRobot: NumeroSerieRobot.create('123456789').getValue(),
      descricaoRobot: DescricaoRobot.create ('Robot 1').getValue(),
      estadoRobot: EstadoRobot.Ativo,
    }
1
    const robot = Robot.create(robotProps, new UniqueEntityID());

    expect(robot.isSuccess).to.be.true;
  });

  it('deve criar um Robot com sucesso com todos os atributos válidos mas sem a descrição', () => {
    const robotProps = {
      codigoRobot: CodigoRobot.create('R001').getValue(),
      nicknameRobot: NicknameRobot.create('Robot1').getValue(),
      tipoRobot: tipoRobotStub,
      numeroserieRobot: NumeroSerieRobot.create('123456789').getValue(),
      estadoRobot: EstadoRobot.Ativo   }

    const robot = Robot.create(robotProps, new UniqueEntityID());
    expect(robot.isSuccess).to.be.true;
  });

  

  it('deve falhar sem codigo', () => {
    expect(() => {
      Robot.create({
        codigoRobot: CodigoRobot.create('').getValue(),
        nicknameRobot: NicknameRobot.create('Robot1').getValue(),
        tipoRobot: tipoRobotStub,
        numeroserieRobot: NumeroSerieRobot.create('123456789').getValue(),
        descricaoRobot: DescricaoRobot.create ('').getValue(),
        estadoRobot: EstadoRobot.Ativo,
      }, new UniqueEntityID());
    }).to.throw();
  });

  
  it('deve falhar sem nickName', () => {
    expect(() => {
      Robot.create({
        codigoRobot: CodigoRobot.create('R001').getValue(),
        nicknameRobot: NicknameRobot.create('').getValue(),
        tipoRobot: tipoRobotStub,
        numeroserieRobot: NumeroSerieRobot.create('123456789').getValue(),
        descricaoRobot: DescricaoRobot.create ('').getValue(),
        estadoRobot: EstadoRobot.Ativo,
      }, new UniqueEntityID());
    }).to.throw();
  });

  it('deve falhar sem numero de serie', () => {
    expect(() => {
      Robot.create({
        codigoRobot: CodigoRobot.create('R001').getValue(),
        nicknameRobot: NicknameRobot.create('Robot1').getValue(),
        tipoRobot: tipoRobotStub,
        numeroserieRobot: NumeroSerieRobot.create('').getValue(),
        descricaoRobot: DescricaoRobot.create ('').getValue(),
        estadoRobot: EstadoRobot.Ativo,
      }, new UniqueEntityID());
    }).to.throw();
  });

  it('deve falhar sem estado', () => {
    expect(() => {
      Robot.create({
        codigoRobot: CodigoRobot.create('R001').getValue(),
        nicknameRobot: NicknameRobot.create('Robot1').getValue(),
        tipoRobot: tipoRobotStub,
        numeroserieRobot: NumeroSerieRobot.create('123456789').getValue(),
        descricaoRobot: DescricaoRobot.create ('').getValue(),
        estadoRobot: EstadoRobot.Ativo,
      }, new UniqueEntityID());
    }).to.throw();
  });

  it('deve falhar com código inválido - mais do que 30 caracteres alfanumericos', () => {
    expect(() => {
      const longStringOfAs = 'a'.repeat(31);

      Robot.create({
        codigoRobot: CodigoRobot.create(longStringOfAs).getValue(),
        nicknameRobot: NicknameRobot.create('Robot1').getValue(),
        tipoRobot: tipoRobotStub,
        numeroserieRobot: NumeroSerieRobot.create('123456789').getValue(),
        descricaoRobot: DescricaoRobot.create ('').getValue(),
        estadoRobot: EstadoRobot.Ativo,
      }, new UniqueEntityID());
    }).to.throw();
  });

  it('deve falhar com código inválido - não alfanumericos', () => {
    expect(() => {
      Robot.create({
        codigoRobot: CodigoRobot.create('R001!').getValue(),
        nicknameRobot: NicknameRobot.create('Robot1').getValue(),
        tipoRobot: tipoRobotStub,
        numeroserieRobot: NumeroSerieRobot.create('123456789').getValue(),
        descricaoRobot: DescricaoRobot.create ('').getValue(),
        estadoRobot: EstadoRobot.Ativo,
      }, new UniqueEntityID());
    }).to.throw();

  });

  it('deve falhar com nickname inválido - mais do que 30 caracteres alfanumericos', () => {
    expect(() => {
      const longStringOfAs = 'a'.repeat(31);

      Robot.create({
        codigoRobot: CodigoRobot.create('R001').getValue(),
        nicknameRobot: NicknameRobot.create(longStringOfAs).getValue(),
        tipoRobot: tipoRobotStub,
        numeroserieRobot: NumeroSerieRobot.create('123456789').getValue(),
        descricaoRobot: DescricaoRobot.create ('').getValue(),
        estadoRobot: EstadoRobot.Ativo,
      }, new UniqueEntityID());
    }).to.throw();
  });

  it('deve falhar com nickname inválido - não alfanumericos', () => {
    expect(() => {
      Robot.create({
        codigoRobot: CodigoRobot.create('R001').getValue(),
        nicknameRobot: NicknameRobot.create('Robot1!').getValue(),
        tipoRobot: tipoRobotStub,
        numeroserieRobot: NumeroSerieRobot.create('123456789').getValue(),
        descricaoRobot: DescricaoRobot.create ('').getValue(),
        estadoRobot: EstadoRobot.Ativo,
      }, new UniqueEntityID());
    }).to.throw();

  });

  it('deve falhar com numeroSerieRobot inválido - mais do que 50 caracteres alfanumericos', () => {
    expect(() => {
      const longStringOfAs = 'a'.repeat(51);

      Robot.create({
        codigoRobot: CodigoRobot.create('R001').getValue(),
        nicknameRobot: NicknameRobot.create('Robot1').getValue(),
        tipoRobot: tipoRobotStub,
        numeroserieRobot: NumeroSerieRobot.create(longStringOfAs).getValue(),
        descricaoRobot: DescricaoRobot.create ('').getValue(),
        estadoRobot: EstadoRobot.Ativo,
      }, new UniqueEntityID());
    }).to.throw();
  });

  it('deve falhar com numeroSerieRobot inválido - não alfanumericos', () => {
    expect(() => {
      Robot.create({
        codigoRobot: CodigoRobot.create('R001').getValue(),
        nicknameRobot: NicknameRobot.create('Robot1').getValue(),
        tipoRobot: tipoRobotStub,
        numeroserieRobot: NumeroSerieRobot.create('123456789!').getValue(),
        descricaoRobot: DescricaoRobot.create ('').getValue(),
        estadoRobot: EstadoRobot.Ativo,
      }, new UniqueEntityID());
    }).to.throw();

  }); 
});