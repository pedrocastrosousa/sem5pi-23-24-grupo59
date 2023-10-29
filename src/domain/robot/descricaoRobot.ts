import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";


interface DescricaoRobotProps {
    value: string;
}

export class DescricaoRobot extends ValueObject<DescricaoRobotProps> {
    get value(): string {
        return this.props.value;
    }
    

    private constructor(props: DescricaoRobotProps) {
        super(props);
    }

    public static create(descricaoRobot: string): Result<DescricaoRobot> {
 
        if (descricaoRobot.length > 250) {
            return Result.fail<DescricaoRobot>("A descrição do Robot não pode conter mais do que 250 caracteres.");
        }

        if (!/^[a-zA-Z0-9 ]+$/.test(descricaoRobot)) {
            return Result.fail<DescricaoRobot>("A descrição do Robot deve conter apenas letras, dígitos e espaços.");
        }

        return Result.ok<DescricaoRobot>(new DescricaoRobot({ value: descricaoRobot }));
    }
}