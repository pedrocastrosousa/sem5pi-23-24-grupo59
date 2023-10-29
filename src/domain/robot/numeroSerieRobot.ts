import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";


interface NumeroSerieRobotProps {
    value: string;
}

export class NumeroSerieRobot extends ValueObject<NumeroSerieRobotProps> {
    get value(): string {
        return this.props.value;
    }
    

    private constructor(props: NumeroSerieRobotProps) {
        super(props);
    }

    public static create(numeroSerieRobotRobot: string): Result<NumeroSerieRobot> {
        if (!numeroSerieRobotRobot) {
            return Result.fail<NumeroSerieRobot>("O número de série do Robot é obrigatório.");
        }

        numeroSerieRobotRobot = numeroSerieRobotRobot.trim(); // Remover espaços em branco extra

        if (numeroSerieRobotRobot.length > 50) {
            return Result.fail<NumeroSerieRobot>("O número de série do Robot não pode conter mais do que 50 caracteres.");
        }

        if (!/^[a-zA-Z0-9 ]+$/.test(numeroSerieRobotRobot)) {
            return Result.fail<NumeroSerieRobot>("O número de série do Robot deve conter apenas letras, dígitos e espaços.");
        }

        return Result.ok<NumeroSerieRobot>(new NumeroSerieRobot({ value: numeroSerieRobotRobot }));
    }
}