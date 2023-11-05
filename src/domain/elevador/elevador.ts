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
import { NumeroIdentificativo } from "./numeroIdentificativo";

//numero de série está a ser validado como não opcional porque estava a dar erro se tal não acontecesse

/*
•	edificio (obrigatório)
•	número identificativo (obrigatório, único no edificio)
•	lista de pisos do edificio servidos pelo elevador (obrigatório)
•	marca (opcional, alfanumerico, 50 caracteres)
•	modelo (opcional, mas obrigatório se marca for introduzido, alfanumerico, 50 caracteres)
•	número de série do fabricante (opcional, alfanumerico, 50 caracteres)
•	breve descrição (opcional, alfanumerico, 250 caracteres)

indeitifcativo do elevador deve ser gerado sequencialmente pelo sistema tendo em conta o edifico, por exemplo,
existirá o elevador 1 do edificio B e o elevador 1 do edificio A
*/

interface ElevadorProps {
    numeroIdentificativo: NumeroIdentificativo;
    edificio: Edificio;
    pisos: Piso[];
    numeroSerie?: NumeroSerieElevador;
    marca?: MarcaElevador;
    modelo?: ModeloElevador;
    descricao?: DescricaoElevador;
}

export class Elevador extends AggregateRoot<ElevadorProps> {

    get id(): UniqueEntityID {
        return this._id;
    }

    get numeroIdentificativo(): NumeroIdentificativo {
        return this.props.numeroIdentificativo;
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
        return this.props.modelo;
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
            { argument: props.numeroIdentificativo, argumentName: 'numeroIdentificativo' },
            { argument: props.edificio, argumentName: 'edificio' },
            { argument: props.pisos, argumentName: 'pisos' },
            { argument: props.numeroSerie, argumentName: 'numeroSerie' }
        ];


        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if (props.marca) {
            if (!props.modelo) {
                return Result.fail<Elevador>("O modelo também deve ser especificado.");
            } else {
                guardedProps.push({ argument: props.marca, argumentName: 'marca' });
                guardedProps.push({ argument: props.modelo, argumentName: 'modelo' });
            }
        } else if (props.modelo) {
            return Result.fail<Elevador>("A marca também deve ser especificada.");
        }

        if (props.descricao) {
            guardedProps.push({ argument: props.descricao, argumentName: 'descricao' });
        }


/*          if (props.pisos.some(piso => piso.edificio.id !== props.edificio.id)) {
            return Result.fail<Elevador>("A lista de pisos não pertence ao edifício especificado.");
        } */


        try{
            if (!guardResult.succeeded) {
                return Result.fail<Elevador>(guardResult.message);
            } else if (props.pisos.some(piso => piso.edificio.codigoEdificio.toString() !== props.edificio.codigoEdificio.toString())) {
                return Result.fail<Elevador>("Um elevador não pode circular em pisos de edifícios diferentes.");
            } else {
                const elevador = new Elevador({
                    ...props
                }, props.numeroIdentificativo);
    
                return Result.ok<Elevador>(elevador);
            }
        } catch (error) {
            return Result.fail<Elevador>("Erro ao verificar se os edificios de cada piso correspondiam ao edificio especificado" + error);
        }   
    }

    updatePisos(pisos: Piso[]) {
        this.props.pisos = pisos;
    }

    updateMarcaEModelo(marca: string, modelo: string): void {

        if (marca.trim()) {
            if (modelo.trim()) {
                this.props.marca = MarcaElevador.create(marca).getValue();
                this.props.modelo = ModeloElevador.create(modelo).getValue();
            }
            else {
                throw new Error("O modelo também deve ser especificado.");
            }
        } else {
            if (modelo.trim()) {
                throw new Error("A marca também deve ser especificada.");
            }
        }
    }

    updateNumeroSerie(numeroSerie: string) {
        this.props.numeroSerie = NumeroSerieElevador.create(numeroSerie).getValue();
    }

    updateDescricao(descricao: string) {
        this.props.descricao = DescricaoElevador.create(descricao).getValue();
    }

}
