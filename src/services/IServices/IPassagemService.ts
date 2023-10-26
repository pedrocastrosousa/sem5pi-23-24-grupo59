import { Result } from "../../core/logic/Result";
import { IPassagemDTO } from "../../dto/IPassagemDTO";

export default interface IPassagemService  {
    createPassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>>;
    getPassagem(): Promise<Result<Array<IPassagemDTO>>>;
    updatePassagem(passagemID:string, passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>>;

    //updatePassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>>;
  }