import { Result } from "../../core/logic/Result";
import IEdificioDTO from "../../dto/IEdificioDTO";
import { IPisoDTO } from "../../dto/IPisoDTO";

export default interface IPisoService  {
    createPiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;
    updatePiso(pisoDTO: IPisoDTO): Promise<Result<IPisoDTO>>;
   // getPiso (pisoId: string): Promise<Result<IPisoDTO>>;
  //  getPiso (pisoId: string): Promise<Result<IPisoDTO>>;
    getEdificiosComMinMaxPisos(minPiso: string , maxPiso: string): Promise<Result<IEdificioDTO[]>>;
}
