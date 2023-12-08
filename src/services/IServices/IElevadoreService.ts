import { Result } from "../../core/logic/Result";
import { IElevadorDTO } from "../../dto/IElevadorDTO";
import { IPisoDTO } from "../../dto/IPisoDTO";

export default interface IElevadorService  {
  createElevador(elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>>;
  updateElevador(numeroIdentificativo:string, elevadorDTO: IElevadorDTO): Promise<Result<IElevadorDTO>>;
  //getelevador (elevadorId: string): Promise<Result<IelevadorDTO>>;
  getElevadores(): Promise<Result<Array<IElevadorDTO>>>;
  deleteElevador(numeroIdentificativo: string);
  listarPisosDeElevadorPorEdificio(edificio: string): Promise<Result<IPisoDTO[]>>;
}
