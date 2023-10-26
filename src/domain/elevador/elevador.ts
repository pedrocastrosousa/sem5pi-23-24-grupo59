import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { DescricaoElevador } from "./descricaoElevador";
import { Guard } from "../../core/logic/Guard";
import { Edificio } from "../edificio/edificio";
import { Piso } from "../piso/piso";
import { MarcaElevador } from "./marcaElevador";
import { ModeloElevador } from "./modeloElevador";
import { NumeroSerieElevador } from "./numeroSerieElevador";

interface ElevadorProps {
    edificio: Edificio;
    pisos: Piso[];
    numeroSerie: NumeroSerieElevador;
    marca?: MarcaElevador;
    modelo?: ModeloElevador;
    descricao?: DescricaoElevador;
}

export class Elevador extends AggregateRoot<ElevadorProps> {
    get id(): UniqueEntityID {
        return this._id;
    }

    get edificio(): Edificio {
        return this.props.edificio;
    }

    get pisos(): Piso[] {
        return this.props.pisos;
    }

    get marca(): MarcaElevador {
        return this.props.marca;
    }

    get modelo(): ModeloElevador {
        return this.props.marca;
    }

    get descricao(): DescricaoElevador {
        return this.props.descricao;
    }

    get numeroSerie(): NumeroSerieElevador {
        return this.props.numeroSerie;
    }



    private constructor(props: ElevadorProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create(props: ElevadorProps, id?: UniqueEntityID): Result<Elevador> {

        const guardedProps = [
            { argument: props.edificio, argumentName: 'edificio' },
            { argument: props.pisos, argumentName: 'pisos' },
            { argument: props.numeroSerie, argumentName: 'numeroSerie' }
        ];

        if (props.marca) {
            if (!props.modelo) {
                return Result.fail<Elevador>("O modelo também deve ser especificado.");
            } else {
                guardedProps.push({ argument: props.marca, argumentName: 'marca' });
                guardedProps.push({ argument: props.modelo, argumentName: 'modelo' });
            }
        }

        if (props.descricao) {
            guardedProps.push({ argument: props.descricao, argumentName: 'descricao' });
        }

/*          if (props.pisos.some(piso => piso.edificio.id !== props.edificio.id)) {
            return Result.fail<Elevador>("A lista de pisos não pertence ao edifício especificado.");
        } */

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (!guardResult.succeeded) {
            return Result.fail<Elevador>(guardResult.message);
        } else if (props.pisos.some(piso => piso.edificio.codigoEdificio.value !== props.edificio.codigoEdificio.value)) {
            return Result.fail<Elevador>("Um elevador não pode circular em pisos de edifícios diferentes.");
        } else {
            const elevador = new Elevador({
                ...props
            }, id);
    
            return Result.ok<Elevador>(elevador);
        }
    }
}
