import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { Edificio } from "../edificio/edificio";
import { PisoDescricao } from "./pisoDescricao";
import { PisoId } from "./pisoId";


interface PisoProps {
  nome: string;
  descricao: PisoDescricao;
  edificio: Edificio;
  codigoPiso: string;
  mapa?: string;
}

export class Piso extends AggregateRoot<PisoProps>{
  get id(): UniqueEntityID {
    return this._id;
  }
  get pisoId (): PisoId {
    return new PisoId(this.pisoId.toValue());
  }

  get nome(): string {
    return this.props.nome;
  }

  get descricao(): PisoDescricao {
    return this.props.descricao;
  }
  get mapa(): string {
    return this.props.mapa;
  }

  get edificio(): Edificio {
    return this.props.edificio;
  }

  set nome (value: string) {
    this.props.nome = value;
  }
  
  set descricao (value: PisoDescricao) {
    this.props.descricao = value;
  }
  set edificio ( value: Edificio) {
    this.props.edificio = value;
  }
  set mapa(mapa:string){
    this.props.mapa = mapa;
}

  get codigoPiso(): string {
    return `${this.props.edificio.codigoEdificio}-${this.props.nome}`;
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

  updateNomePiso(nomePiso: String): void {
    if (nomePiso) {
        this.props.nome = nomePiso.toString();
    }
}

updateDescricao(descricao: PisoDescricao): void {
    if (descricao) {
        this.props.descricao = descricao;
    }
}
/*
updateMapa(mapa: PisoMapa): void {
  if (mapa) {
      this.props.mapa = mapa;
  }
}
*/
}