import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";

interface DescricaoSalaProps {
  descricao: string;
}

export class DescricaoSala extends ValueObject<DescricaoSalaProps> {
  
    get descricao(): string {
    return this.props.descricao;
  }

  private constructor(props: DescricaoSalaProps) {
    super(props);
  }

  public static create(descricaoSala: string): Result<DescricaoSala> {
    return Result.ok<DescricaoSala>(new DescricaoSala({ descricao: descricaoSala }))
  }
}