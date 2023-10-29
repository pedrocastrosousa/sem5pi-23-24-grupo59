import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";


interface NicknameRobotProps {
    value: string;
}

export class NicknameRobot extends ValueObject<NicknameRobotProps> {
    get value(): string {
        return this.props.value;
    }
    

    private constructor(props: NicknameRobotProps) {
        super(props);
    }

    public static create(nicknameRobot: string): Result<NicknameRobot> {
        if (!nicknameRobot) {
            return Result.fail<NicknameRobot>("O nickname do robot é obrigatório.");
        }

        nicknameRobot = nicknameRobot.trim(); // Remover espaços em branco extra

        if (nicknameRobot.length > 30) {
            return Result.fail<NicknameRobot>("O nickname do robot não pode conter mais do que 30 caracteres.");
        }

        if (!/^[a-zA-Z0-9 ]+$/.test(nicknameRobot)) {
            return Result.fail<NicknameRobot>("O nickname do robot deve conter apenas letras, dígitos e espaços.");
        }

        return Result.ok<NicknameRobot>(new NicknameRobot({ value: nicknameRobot }));
    }
}