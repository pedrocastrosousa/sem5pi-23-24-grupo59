import { update } from "lodash";
import { Result } from "../../core/logic/Result";
import { IPassagemDTO } from "../../dto/IPassagemDTO";

export default interface IPassagemService  {
    createPassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>>;
    getPassagemEntreEdificioeEdificio2(edificio1 : string, edificio2: string ): Promise<Result<IPassagemDTO[]>>;
    getAllPassagens(): Promise<Result<Array<IPassagemDTO>>>;
  updatePassagem(passagemId: string, passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>>;
    //updatePassagem(passagemDTO: IPassagemDTO): Promise<Result<IPassagemDTO>>;
  }