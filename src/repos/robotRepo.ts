import { Service, Inject } from 'typedi';

import IRobotRepo from '../services/IRepos/IRobotRepo';
import { Robot } from '../domain/robot/robot';
import { RobotMap } from '../mappers/RobotMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { IRobotPersistence } from '../dataschema/IRobotPersistence';

//TO_DO
@Service()
export default class RobotRepo implements IRobotRepo {
    private models: any;

    constructor(
        @Inject('robotSchema') private robotSchema: Model<IRobotPersistence & Document>,
    ) { }
   
    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async save(robot: Robot): Promise<Robot> {
        const query = { codigoRobot: robot.codigoRobot.toString() };

        const robotDocument = await this.robotSchema.findOne(query);
        try {
            if (robotDocument === null) {
                const rawrobot: any = RobotMap.toPersistence(robot);
                console.log(rawrobot);
                const robotCreated = await this.robotSchema.create(rawrobot);
                return RobotMap.toDomain(robotCreated);
            } else {
            
                //robotDocument.codigoRobot = robot.codigoRobot.toString();
                robotDocument.nicknameRobot= robot.nicknameRobot.value;

                robotDocument.tipoRobot = robot.tipoRobot.designacaoTipoRobot.designacao;
                robotDocument.numeroSerieRobot = robot.numeroserieRobot.value;
                //robotDocument.descricaoRobot = robot.descricaoRobot.value;

                robotDocument.estadoRobot = robot.estadoRobot.toString();
    
                await robotDocument.save();
                return robot;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findById(id: string): Promise<Robot> {
        const query = { domainId: id };
        const robotRecord = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence & Document>);
        if (robotRecord != null)
            return RobotMap.toDomain(robotRecord);
        else return null;
    }

    public async findByCodigo(id: string): Promise<Robot> {
        const query = { codigoRobot: id };
        const robotRecord = await this.robotSchema.findOne(query as FilterQuery<IRobotPersistence & Document>);
        if (robotRecord != null)
            return RobotMap.toDomain(robotRecord);
        else return null;
    }

    public async findAll(): Promise<Robot[]> {
        const edificioList = await this.robotSchema.find();

        if (edificioList != null) {
            return RobotMap.toDomainBulk(edificioList);
        }
    }

    public async exists(t: Robot): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    public async delete(codigo: string) {
        const query = { codigoRobot: codigo };
        await this.robotSchema.deleteOne(query as FilterQuery<IRobotPersistence & Document>);
      }
}