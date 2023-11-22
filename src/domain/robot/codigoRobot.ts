import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";


interface CodigoRobotProps {
    value: string;
}

export class CodigoRobot extends UniqueEntityID{
   

    public static create(codigoRobot: string): Result<CodigoRobot> {
        if (!codigoRobot) {
            return Result.fail<CodigoRobot>("O código do robot é obrigatório.");
        }

        codigoRobot = codigoRobot.trim(); // Remover espaços em branco extra

        if (codigoRobot.length > 30) {
            return Result.fail<CodigoRobot>("O código do robot não pode conter mais do que 30 caracteres.");
        }

        if (!/^[a-zA-Z0-9 ]+$/.test(codigoRobot)) {
            return Result.fail<CodigoRobot>("O código do robot deve conter apenas letras, dígitos e espaços.");
        }

        return Result.ok<CodigoRobot>(new CodigoRobot(codigoRobot ));
    }
}