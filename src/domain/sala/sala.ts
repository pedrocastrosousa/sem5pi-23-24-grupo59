import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

import { CategoriaSala } from "./categoriaSala";
import { DimensaoSala } from "./dimensaoSala";
import { DescricaoSala } from "./descricaoSala";

interface UserProps {
  categoriaSala: CategoriaSala;
  dimensaoSala: DimensaoSala;
  descricaoSala: DescricaoSala;
}

export class Sala extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
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

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<Sala> {

    const guardedProps = [
      { argument: props.categoriaSala, argumentName: 'categoriaSala' },
      { argument: props.dimensaoSala, argumentName: 'dimensaoSala' },
      { argument: props.descricaoSala, argumentName: 'descricaoSala' }
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
}