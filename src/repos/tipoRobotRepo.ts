import { Service, Inject } from 'typedi';

import { TipoRobot } from '../domain/tipoRobot/tipoRobot';
import { IdTipoRobot } from '../domain/tipoRobot/idTipoRobot';

import { Document, FilterQuery, Model } from 'mongoose';
import { ITipoRobotPersistence } from '../dataschema/ITipoRobotPersistence';
import ITipoRobotRepo from '../services/IRepos/ITipoRobotRepo';
import { TipoRobotMap } from '../mappers/TipoRobotMap';

@Service()
export default class TipoRobotRepo implements ITipoRobotRepo {
  private models: any;

  constructor(@Inject('tipoRobotSchema') private tipoRobotSchema: Model<ITipoRobotPersistence & Document>) {}

  private createBaseQuery(): any {
    return {
      where: {},
    };
  }

  public async exists(tipoRobot: TipoRobot): Promise<boolean> {
    const idX = tipoRobot.id instanceof IdTipoRobot ? (<IdTipoRobot>tipoRobot.id).toValue() : tipoRobot.id;

    const query = { domainId: idX };
    const roleDocument = await this.tipoRobotSchema.findOne(query as FilterQuery<ITipoRobotPersistence & Document>);

    return !!roleDocument === true;
  }

  public async save(tipoRobot: TipoRobot): Promise<TipoRobot> {
    const query = { domainId: tipoRobot.id.toString() };

    const tipoRobotDocument = await this.tipoRobotSchema.findOne(query);

    try {
      if (tipoRobotDocument === null) {
        const rawTipoRobot: any = TipoRobotMap.toPersistence(tipoRobot);

        const tipoRobotCreated = await this.tipoRobotSchema.create(rawTipoRobot);

        return TipoRobotMap.toDomain(tipoRobotCreated);
      } else {
        tipoRobotDocument.designacaoTipoRobot = tipoRobot.designacaoTipoRobot.designacao;
        await tipoRobotDocument.save();

        return tipoRobot;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId(idTipoRobot: IdTipoRobot | string): Promise<TipoRobot> {
    const query = { domainId: idTipoRobot };
    const tipoRobotRecord = await this.tipoRobotSchema.findOne(query as FilterQuery<ITipoRobotPersistence & Document>);

    if (tipoRobotRecord != null) {
      return TipoRobotMap.toDomain(tipoRobotRecord);
    } else return null;
  }
}
