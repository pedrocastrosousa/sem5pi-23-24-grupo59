import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

// enum caregoriasEnu {
//     Gabinete = "Gabinete",
//     Anfiteatro = "Anfiteatro",
//     Laboratorio = "Laboratorio",
//     Outros = "Outros"
// }

interface CategoriaSalaProps {
  categoria: string;
}

export class CategoriaSala extends ValueObject<CategoriaSalaProps> {
  
  get categoria(): string {
    return this.props.categoria;
  }

  private constructor(props: CategoriaSalaProps) {
    super(props);
  }

  public static create(categoriaSala: string): Result<CategoriaSala> {
    return Result.ok<CategoriaSala>(new CategoriaSala({ categoria: categoriaSala }))
  }
}