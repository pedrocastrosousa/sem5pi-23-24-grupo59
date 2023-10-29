import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { RobotId } from "./robotId";
import { CodigoRobot } from "./codigoRobot";
import { NicknameRobot } from "./nicknameRobot";
import { TipoRobot } from "../tipoRobot/tipoRobot";
import { NumeroSerieRobot } from "./numeroSerieRobot";
import { DescricaoRobot } from "./descricaoRobot";
import { EstadoRobot } from "./estadoRobot";


interface RobotProps {
    codigoRobot: CodigoRobot;
    nicknameRobot: NicknameRobot;
    tipoRobot: TipoRobot;
    numeroserieRobot: NumeroSerieRobot;
    descricaoRobot: DescricaoRobot;
    estadoRobot: EstadoRobot;
}

export class Robot extends AggregateRoot<RobotProps>{
    
    get id(): UniqueEntityID {
        return this._id;
    }

    get robotId (): RobotId {
        return new RobotId(this.robotId.toValue());
      }
      
    get codigoRobot(): CodigoRobot {
        return this.props.codigoRobot;
    }

    get nicknameRobot(): NicknameRobot {
        return this.props.nicknameRobot;
    }

    set nicknameRobot(nickname: NicknameRobot){
        this.props.nicknameRobot = nickname; 
    }

    get tipoRobot(): TipoRobot {
        return this.props.tipoRobot;
    }

    set tipoRobot(tipo: TipoRobot){
        this.props.tipoRobot = tipo; 
    }

    get numeroserieRobot(): NumeroSerieRobot {
        return this.props.numeroserieRobot;
    }

    set numeroserieRobot(numeroserie: NumeroSerieRobot){
        this.props.numeroserieRobot = numeroserie; 
    }
    

    get descricaoRobot(): DescricaoRobot {
        return this.props.descricaoRobot;
    } 

    set descricaoRobot(descricao: DescricaoRobot){
        this.props.descricaoRobot = descricao; 
    }

    get estadoRobot(): EstadoRobot {
        return this.props.estadoRobot;
    }

    set estadoRobot(estado: EstadoRobot){
        this.props.estadoRobot = estado; 
    }


    private constructor (props: RobotProps, id?: UniqueEntityID) {
        super(props, id);
        if (!props.estadoRobot) {
            this.props.estadoRobot = EstadoRobot.Ativo;
        }
    }

    public static create (props: RobotProps, id?: UniqueEntityID): Result<Robot> {

        const guardedProps = [
          { argument: props.codigoRobot, argumentName: 'codigoRobot' },
            { argument: props.nicknameRobot, argumentName: 'nicknameRobot' },
            { argument: props.tipoRobot, argumentName: 'tipoRobot' },
            { argument: props.numeroserieRobot, argumentName: 'numeroserieRobot' },
          { argument: props.descricaoRobot, argumentName: 'descricaoRobot' },
            { argument: props.estadoRobot, argumentName: 'estadoRobot' }
        ];
    
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    
        if (!guardResult.succeeded) {
          return Result.fail<Robot>(guardResult.message)
        }     
        else {
          return Result.ok<Robot>(
            new Robot({
            ...props
          }, id));
        }

    }
}