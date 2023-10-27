import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface NomeSalaProps {
  nome: string;
}

export class NomeSala extends ValueObject<NomeSalaProps> {
  
    get nome(): string {
    return this.props.nome;
  }

  private constructor(props: NomeSalaProps) {
    super(props);
  }

  public static create(nomeSala: string): Result<NomeSala> {
    if (nomeSala.length > 50){
      return Result.fail<NomeSala>('Nome da sala demasiado longo. Máximo de 50 caracteres');//alterar para conseguir retornar como jason
    }
    else  {
      return Result.ok<NomeSala>(new NomeSala({ nome: nomeSala }));
    }
  }
}