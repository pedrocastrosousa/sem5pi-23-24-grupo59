import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { PisoDescricao } from "./pisoDescricao";
import { PisoNome } from "./pisoNome";



interface PisoProps {
  nome: PisoNome;
  descricao: PisoDescricao;
  edificio: string;
}

export class Piso extends AggregateRoot<PisoProps>{
  get id(): UniqueEntityID {
    return this._id;
  }

  get nome(): PisoNome {
    return this.props.nome;
  }

  get descricao(): PisoDescricao {
    return this.props.descricao;
  }
  
  get edificio(): string {
    return this.props.edificio;
  }

  set nome (value: PisoNome) {
    this.props.nome = value;
  }
  
  set descricao (value: PisoDescricao) {
    this.props.descricao = value;
  }
  set edificio ( value: string) {
    this.props.edificio = value;
  }

  private constructor(props: PisoProps, id?: UniqueEntityID) {
    super(props, id);
  }


  public static create(props: PisoProps, id?: UniqueEntityID): Result<Piso> {

    const guardedProps = [
      { argument: props.nome, argumentName: 'nome' },
      { argument: props.descricao, argumentName: 'descricao' },
      { argument: props.edificio, argumentName: 'edificio' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Piso>(guardResult.message)
    }
    else {
      const piso = new Piso({
        ...props
      }, id);

      return Result.ok<Piso>(piso);

    }
  }
}