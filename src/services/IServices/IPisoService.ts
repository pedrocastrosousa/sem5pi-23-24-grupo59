import { Result } from "../../core/logic/Result";
import IEdificioDTO from "../../dto/IEdificioDTO";
import IMapaDTO from "../../dto/IMapaDTO";
import { IPisoDTO } from "../../dto/IPisoDTO";

export default interface IPisoService  {
    createPiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;
    updatePiso(pisoID:string, pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;
   // getPiso (pisoId: string): Promise<Result<IPisoDTO>>;
  //  getPiso (pisoId: string): Promise<Result<IPisoDTO>>; 
  getEdificiosComMinMaxPisos(minPiso: string , maxPiso: string): Promise<Result<IEdificioDTO[]>>;
  getPisosDeEdificioComPassagem(edificio: string): Promise<Result<IPisoDTO[]>>;
  getPisosPorEdificio(edificioId: string): Promise<Result<IPisoDTO[]>>;
  carregarMapa(file: IMapaDTO): Promise<Result<boolean>>;
  listarPisos(): Promise<Result<IPisoDTO[]>>;
  delete(codigoPiso: string);

}
