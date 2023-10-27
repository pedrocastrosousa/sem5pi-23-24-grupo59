import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

enum categoriaSalaEnum {
    Gabinete = "Gabinete",
    Anfiteatro = "Anfiteatro",
    Laboratorio = "Laboratorio",
    Outros = "Outros"
}

interface CategoriaSalaProps {
  categoria: categoriaSalaEnum;
}

export class CategoriaSala extends ValueObject<CategoriaSalaProps> {
  
  get categoria(): string {
    return this.props.categoria;
  }

  private constructor(props: CategoriaSalaProps) {
    super(props);
  }

  public static create(categoriaSala: string): Result<CategoriaSala> {
    if (Object.values<String>(categoriaSalaEnum).includes(categoriaSala)){
      return Result.ok<CategoriaSala>(new CategoriaSala({ categoria: categoriaSala as categoriaSalaEnum }));
    } 
    return Result.fail<CategoriaSala>('Categoria de sala inválida.\n Escolha entre: Gabinete, Anfiteatro, Laboratorio ou Outros.');//alterar para conseguir retornar como jason
  }
}