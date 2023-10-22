import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";
import { DescricaoEdificio } from "./descricaoEdificio";
import { NomeEdificio } from "./nomeEdificio";
import { DimensaoMaximaPisos } from "./dimensaoMaximaPisos";
import { CodigoEdificio } from "./codigoEdificio";

interface EdificioProps {
    descricaoEdificio: DescricaoEdificio;
    nomeEdificio: NomeEdificio;
    dimensaoMaximaPisos: DimensaoMaximaPisos;
}

export class Edificio extends AggregateRoot<EdificioProps>{
    
    get id(): UniqueEntityID {
        return this._id;
    }

    get codigoEdificio(): CodigoEdificio {
        return new CodigoEdificio(this.codigoEdificio.toValue());
    }

    get descricaoEdificio(): DescricaoEdificio {
        return this.props.descricaoEdificio;
    } 

    set descricaoEdificio(descricao: DescricaoEdificio){
        this.props.descricaoEdificio = descricao; 
    }

    get nomeEdificio(): NomeEdificio {
        return this.props.nomeEdificio;
    } 

    set nomeEdificio(nome: NomeEdificio){
        this.props.nomeEdificio = nome; 
    }

    get dimensaoMaximaPisos(): DimensaoMaximaPisos {
        return this.props.dimensaoMaximaPisos;
    } 

    set dimensaoMaximaPisos(dimensao: DimensaoMaximaPisos){
        this.props.dimensaoMaximaPisos = dimensao; 
    }

    private constructor (props: EdificioProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: EdificioProps, id?: UniqueEntityID): Result<Edificio> {

        const guardedProps = [
          { argument: props.descricaoEdificio, argumentName: 'descricao' },
          { argument: props.nomeEdificio, argumentName: 'nome' },
          { argument: props.dimensaoMaximaPisos, argumentName: 'dimensao' },
        ];
    
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
    
        if (!guardResult.succeeded) {
          return Result.fail<Edificio>(guardResult.message)
        }     
        else {
          return Result.ok<Edificio>(
            new Edificio({
            ...props
          }, id));
        }

    }
}