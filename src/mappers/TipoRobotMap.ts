import { Mapper } from '../core/infra/Mapper';

import { Document, Model } from 'mongoose';
import { ITipoRobotPersistence } from '../dataschema/ITipoRobotPersistence';

import ITipoRobotDTO from '../dto/ITipoRobotDTO';
import { TipoRobot } from '../domain/tipoRobot/tipoRobot';

import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import { DesignacaoTipoRobot } from '../domain/tipoRobot/designacaoTipoRobot';

export class TipoRobotMap extends Mapper<TipoRobot> {
         public static toDTO(tipoRobot: TipoRobot): ITipoRobotDTO {
           return {
             id: tipoRobot.id.toString(),
             designacaoTipoRobot: tipoRobot.designacaoTipoRobot.designacao,
           };
         }

         public static toDomain(tipoRobot: any | Model<ITipoRobotPersistence & Document>): TipoRobot {
           const designacaoTipoRobotOrError = DesignacaoTipoRobot.create(tipoRobot.designacaoTipoRobot);

           const tipoRobotOrError = TipoRobot.create(
             {
               designacaoTipoRobot: designacaoTipoRobotOrError.getValue(),
             },
             new UniqueEntityID(tipoRobot.domainId),
           );

           tipoRobotOrError.isFailure ? console.log(tipoRobotOrError.error) : '';

           return tipoRobotOrError.isSuccess ? tipoRobotOrError.getValue() : null;
         }

         public static toPersistence(tipoRobot: TipoRobot): any {
           return {
             domainId: tipoRobot.id.toString(),
             designacaoTipoRobot: tipoRobot.designacaoTipoRobot.designacao,
           };
         }
       }