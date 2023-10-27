import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

import { CategoriaSala } from "./categoriaSala";
import { DescricaoSala } from "./descricaoSala";
import { NomeSala } from "./nomeSala";
import { Piso } from "../piso/piso";
import { DimensaoSala } from "./dimensaoSala";
import { ISalaDTO } from "../../dto/ISalaDTO";

interface UserProps {
  nomeSala: NomeSala;
  categoriaSala: CategoriaSala;
  dimensaoSala: DimensaoSala;
  descricaoSala: DescricaoSala;
  piso: Piso;
}

export class Sala extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get nomeSala (): NomeSala {
    return this.props.nomeSala;
  }

  get categoriaSala (): CategoriaSala {
    return this.props.categoriaSala;
  }

  get dimensaoSala (): DimensaoSala {
    return this.props.dimensaoSala;
  }

  get descricaoSala (): DescricaoSala {
    return this.props.descricaoSala;
  }

  get piso (): Piso {
    return this.props.piso;
  }

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<Sala> {

    const guardedProps = [
      { argument: props.nomeSala, argumentName: 'nomeSala'},
      { argument: props.categoriaSala, argumentName: 'categoriaSala' },
      { argument: props.dimensaoSala, argumentName: 'dimensaoSala' },
      { argument: props.descricaoSala, argumentName: 'descricaoSala' },
      { argument: props.piso, argumentName: 'piso'}
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<Sala>(guardResult.message);
    }     
    else {
      const sala = new Sala({
        ...props
      }, id);

      return Result.ok<Sala>(sala);
    }
  }

  // public static createDTO (salaDTO: ISalaDTO, pisoDaSala: Piso id?: UniqueEntityID): Result<Sala> {
  
  //   const guardedProps = [
  //     { argument: salaDTO.nomeSala, argumentName: 'nomeSala'},
  //     { argument: salaDTO.categoriaSala, argumentName: 'categoriaSala' },
  //     { argument: salaDTO.dimensaoSala, argumentName: 'dimensaoSala' },
  //     { argument: salaDTO.descricaoSala, argumentName: 'descricaoSala' },
  //     { argument: salaDTO.piso, argumentName: 'piso'}
  //   ];

  //   const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

  //   if (!guardResult.succeeded) {
  //     return Result.fail<Sala>(guardResult.message);
  //   }     
  //   else {
  //     const sala = new Sala({
  //       nomeSala: NomeSala.create(salaDTO.nomeSala).getValue(),
  //       categoriaSala: CategoriaSala.create(salaDTO.categoriaSala).getValue(),
  //       dimensaoSala: DimensaoSala.create(salaDTO.dimensaoSala.x1, salaDTO.dimensaoSala.y1, salaDTO.dimensaoSala.x2, salaDTO.dimensaoSala.y2).getValue(),
  //       descricaoSala: DescricaoSala.create(salaDTO.descricaoSala).getValue(),
  //       piso: pisoDaSala
  //     }, id);
      

  //     return Result.ok<Sala>(sala);
  //   }
  // }

}